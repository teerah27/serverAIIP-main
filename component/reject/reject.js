const express = require('express');
const rejectRouter = express.Router();
const pool = require('../db/db');

rejectRouter.get('/', (req, res) => {
    res.set('Cache-Control', 'no-store, must-revalidate');

    if (req.session.user) {
        pool.query('SELECT r.*, i.*, v.*, o.* FROM rejects r JOIN images i ON r.image_id = i.id JOIN outlets o ON i.outlet_id = o.id JOIN van_users v ON r.van_user_id = v.id', (err, result) => {
        // pool.query('SELECT * FROM table_oss', (err, result) => {
            
            if (!err) {
                res.render('reject', { data: result.rows }); 
            } else {
                console.error('Error fetching user details:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    } else {
        res.redirect('/login');
    }
});

module.exports = rejectRouter;