const express = require('express');
const imgprocessRouter = express.Router();
const pool = require('../db/db');

imgprocessRouter.get('/', (req, res) => {
    res.set('Cache-Control', 'no-store, must-revalidate');

    if (req.session.user) {
        pool.query('SELECT * FROM table_oss WHERE compliance_check = \'Non-compliance\'', (err, result) => {
            if (!err) {
                res.render('img_process', { data: result.rows });
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

imgprocessRouter.post('/update', (req, res) => {
    if (req.session.user) {
        const recordComplianceStatus = 'Non-compliance'; 
        pool.query('UPDATE table_oss SET compliance_check = $1 WHERE compliance_check = $2', ['Compliance', recordComplianceStatus], (err, result) => {
            if (!err) {
                console.log('Database updated successfully');
                // Redirect to the first URL on the client side
                
                res.redirect('http://47.250.10.195:8888/');
                if (!err) {
                    console.log('Redirecting to http://47.250.10.195:8888/');
                } else {
                    console.error('Error going to 8888:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            } else {
                console.error('Error updating records:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

module.exports = imgprocessRouter;