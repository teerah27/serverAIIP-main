const express = require('express');
const imgprocessRouter = express.Router();
const pool = require('../db/db');

imgprocessRouter.get('/', (req, res) => {
    res.set('Cache-Control', 'no-store, must-revalidate');

    if (req.session.user) {
        // pool.query('SELECT * FROM test_grafana WHERE compliance_check = \'No\'', (err, result) => {
        pool.query('SELECT * FROM table_oss', (err, result) => {
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
        const recordComplianceStatus = 'No'; 
        pool.query('UPDATE test_grafana SET compliance_check = \'Yes\' WHERE compliance_check = $1', [recordComplianceStatus], (err, result) => {
            if (!err) {
                // Redirect the user to "https://47.250.10.195:8888/" first
                res.redirect('https://47.250.10.195:8888/');

                // You can add a delay before redirecting to "img_process?process=true" if needed
                setTimeout(() => {
                    res.redirect('/img_process?process=true');
                }, 3000); // 3 seconds delay (adjust as needed)
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