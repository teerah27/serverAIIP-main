const express = require('express');
const productRouter = express.Router();
const pool = require('../db/db');
const { v4: uuidv4 } = require('uuid');

// Route for getting brands and outlets to populate the form
productRouter.get('/product/addProduct', (req, res) => {
    if (req.session.user) {
        pool.query('SELECT * FROM brands', (brandErr, brandResult) => {
            if (brandErr) {
                console.error('Error fetching brands:', brandErr);
                res.status(500).json({ error: 'Failed to fetch brands' });
                return;
            }

            const brandData = brandResult.rows;

            pool.query('SELECT * FROM outlets', (outletErr, outletResult) => {
                if (outletErr) {
                    console.error('Error fetching outlets:', outletErr);
                    res.status(500).json({ error: 'Failed to fetch outlets' });
                    return;
                }

                const outletData = outletResult.rows;

                res.render('addProduct', { brandData, outletData });
            });
        });
    } else {
        res.redirect('/login'); // If user is not authenticated
    }
});

module.exports = productRouter;
