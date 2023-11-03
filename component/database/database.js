// const express = require('express');
// const databaseRouter = express.Router();
// const pool = require('../db/db');

// databaseRouter.get('/', (req, res) => {
//     res.set('Cache-Control', 'no-store, must-revalidate');

//     if (req.session.user) {
//         pool.query('SELECT * FROM images WHERE process_status = \'Yes\'', (err, result) => {
//         // pool.query('SELECT * FROM table_oss', (err, result) => {
            
//             if (!err) {
//                 res.render('database', { data: result.rows }); 
//             } else {
//                 console.error('Error fetching user details:', err);
//                 res.status(500).json({ error: 'Internal Server Error' });
//             }
//         });
//     } else {
//         res.redirect('/login');
//     }
// });

// module.exports = databaseRouter;

const express = require('express');
const databaseRouter = express.Router();
const pool = require('../db/db');

databaseRouter.get('/', (req, res) => {
    res.set('Cache-Control', 'no-store, must-revalidate');

    if (req.session.user) {
        pool.query('SELECT i.*, v.*, o.* FROM images i JOIN van_users v ON i.van_user_id = v.id JOIN outlets o ON i.outlet_id = o.id WHERE process_status = \'Yes\'', (err, result) => {
        // pool.query('SELECT * FROM table_oss', (err, result) => {
            
            if (!err) {
                res.render('database', { data: result.rows }); 
            } else {
                console.error('Error fetching user details:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    } else {
        res.redirect('/login');
    }
});

module.exports = databaseRouter;