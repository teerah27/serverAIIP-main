const express = require('express');
const outletRouter = express.Router();
const pool = require('../db/db');
const { v4: uuidv4 } = require('uuid');


outletRouter.get('/', (req, res) => {
    res.set('Cache-Control', 'no-store, must-revalidate');

    if (req.session.user) {
        pool.query('SELECT * FROM outlets ORDER BY outlet_name', (err, result) => {
            if (!err) {
                res.render('outlet', { data: result.rows, user: req.session.user });
            } else {
                console.error('Error executing SQL query:', err);
                console.error(err.stack);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    } else {
        res.redirect('/login');
    }
});

outletRouter.post('/addOutlet', async (req, res) => {
    const { outlet_name, outlet_location } = req.body;
    const loggedInName = req.session.userEmail;

    const formattedTimestamp = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kuala_Lumpur',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date());

    try {
        const outletId = uuidv4();

        const insertQuery = `
            INSERT INTO outlets (id, outlet_name, outlet_location, created_at, created_by)
            VALUES ($1, $2, $3, $4, $5)
        `;
        const values = [outletId, outlet_name, outlet_location, formattedTimestamp, loggedInName];

        await pool.query(insertQuery, values);

        res.redirect('/outlet?outlet=true');
    } catch (error) {
        console.error(error); 
        res.status(500).send('Internal server error: ' + error.message); 
    }
});

outletRouter.delete('/deleteOutlet/:id', async (req, res) => {
    const outletId = req.params.id;

    try {
        // Perform the deletion operation in the database
        await pool.query('DELETE FROM outlets WHERE id = $1', [outletId]);

        res.sendStatus(204); // Send a 204 (No Content) status for a successful deletion
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error: ' + error.message);
    }
});




module.exports = outletRouter;