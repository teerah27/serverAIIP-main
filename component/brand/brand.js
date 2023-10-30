const express = require('express');
const brandRouter = express.Router();
const pool = require('../db/db');
const { v4: uuidv4 } = require('uuid');

// GET route to render the brand registration form
brandRouter.get('/', (req, res) => {
    if (req.session.user) {
        pool.query('SELECT * FROM outlets', (err, result) => {
            if (err) {
                console.error('Error executing SQL query:', err);
                console.error(err.stack);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            
            const brandData = result.rows;
            res.render('manageProduct', { brandData });
        });
    } else {
        res.redirect('/login');
    }
});

brandRouter.post('/addBrand', (req, res) => {
    const { outlet, brand_name } = req.body; // Assuming 'outlet' and 'brand_name' are sent from the form
    const brandid = uuidv4();
    const loggedInName = req.session.userEmail;

    const formattedTimestamp = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kuala_Lumpur',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date());

    pool.query('INSERT INTO brands (id, outlet_id, brand_name, created_at, created_by) VALUES ($1, $2, $3, $4, $5)', [brandid, outlet, brand_name, formattedTimestamp, loggedInName], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            console.error(err.stack);
            res.status(500).json({ error: 'Internal Server Error'+ error.message });
        } else {
            res.status(200).json({ message: 'Brand added successfully' });
        }
    });
});

module.exports = brandRouter;
