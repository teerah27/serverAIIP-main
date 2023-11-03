const express = require('express');
const manageRouter = express.Router();
const pool = require('../db/db');
const { v4: uuidv4 } = require('uuid');

manageRouter.get('/', async (req, res) => {
    if (req.session.user) {
        // Check if there are any rows in the products table
        pool.query('SELECT COUNT(*) AS productCount FROM products', (countErr, countResult) => {
            if (countErr) {
                console.error('Error checking product table:', countErr);
                console.error(countErr.stack);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            const productCount = countResult.rows[0].productCount;

            // Construct the SQL query based on the product count
            let sqlQuery;
            if (productCount > 0) {
                sqlQuery = 'SELECT b.brand_name, p.product_name FROM brands AS b LEFT JOIN products AS p ON b.id = p.brand_id ORDER BY b.brand_name, p.product_name';
            } else {
                sqlQuery = 'SELECT * FROM brands';
            }

            // Execute the SQL query
            pool.query(sqlQuery, (queryErr, queryResult) => {
                if (queryErr) {
                    console.error('Error executing SQL query:', queryErr);
                    console.error(queryErr.stack);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
                const brandData = queryResult.rows;
                res.render('manage', { brandData: brandData, data: brandData }); // Pass both brandData and data to the view
            });
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
            res.redirect('/manage?brand=true');
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
            res.redirect('/manage?product=true');
        }
    });
});

module.exports = manageRouter;
