const express = require('express');
const databaseRouter = express.Router();
const pool = require('../db/db');


databaseRouter.get('/', (req, res) => {
    res.set('Cache-Control', 'no-store, must-revalidate');

    if (req.session.user) {
        // Add parameters for filtering
        const staffFilter = req.query.staff;
        const outletFilter = req.query.outlet;
        const processedAtFilter = req.query.processedAt;

        const query = `
        SELECT i.*, v.*, o.*
        FROM images i
        JOIN van_users v ON i.van_user_id = v.id
        JOIN outlets o ON i.outlet_id = o.id
        WHERE process_status = 'Yes'
        AND (
          (${staffFilter && staffFilter !== 'All' ? 'v.first_name || \' \' || v.last_name ILIKE $1' : '1=1'})
          OR
          (${outletFilter && outletFilter !== 'All' ? 'o.outlet_name ILIKE $2' : '1=1'})

        )      
        ORDER BY i.process_date DESC`;
    
        const params = [
            staffFilter && staffFilter !== 'All' ? `%${staffFilter}%` : null,
            outletFilter && outletFilter !== 'All' ? `%${outletFilter}%` : null,
          ].filter(param => param !== null);
                     

        pool.query(query, params, (err, result) => {
            if (!err) {
                res.render('database', { data: result.rows, user: req.session.user, staffFilter, outletFilter, processedAtFilter });
            } else {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Internal Server Error', errorMessage: err.message });
                console.log('SQL Query:', query, 'with parameters:', params);
            }
        });
    } else {
        res.redirect('/login');
    }
});

module.exports = databaseRouter;
