const express = require('express');
const manageRouter = express.Router();
const pool = require('../db/db');
const { v4: uuidv4 } = require('uuid');

manageRouter.get('/', async (req, res) => {
    if (req.session.user) {
        pool.query('SELECT * FROM brands', (err, result) => {
            if (err) {
                console.error('Error executing SQL query:', err);
                console.error(err.stack);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            
            const brandData = result.rows;
            res.render('manage', { brandData });
        });
    } else {
        res.redirect('/login');
    }
});

manageRouter.post('/addBrand', (req, res) => {
    const { brand_name } = req.body; // Assuming 'outlet' and 'brand_name' are sent from the form
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

    pool.query('INSERT INTO brands (id, brand_name, created_at, created_by) VALUES ($1, $2, $3, $4)', [brandid, brand_name, formattedTimestamp, loggedInName], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            console.error(err.stack);
            res.status(500).json({ error: 'Internal Server Error'+ error.message });
        } else {
            res.redirect('/manage');
        }
    });
});

manageRouter.post('/addProduct', (req, res) => {
    const { brand, product_name } = req.body; // Assuming 'outlet' and 'brand_name' are sent from the form
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

    pool.query('INSERT INTO products (id, brand_id, product_name, created_at, created_by) VALUES ($1, $2, $3, $4, $5)', [brandid, brand, product_name, formattedTimestamp, loggedInName], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            console.error(err.stack);
            res.status(500).json({ error: 'Internal Server Error'});
        } else {
            res.redirect('/manage');
        }
    });
});

module.exports = manageRouter;
