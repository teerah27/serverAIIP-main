// const express = require('express');
// const imgprocessRouter = express.Router();
// const pool = require('../db/db');

// imgprocessRouter.get('/', (req, res) => {
//     res.set('Cache-Control', 'no-store, must-revalidate');

//     if (req.session.user) {
//         pool.query('SELECT * FROM table_oss WHERE compliance_check = \'Non-compliance\'', (err, result) => {
//             if (!err) {
//                 res.render('img_process', { data: result.rows });
//             } else {
//                 console.error('Error executing SQL query:', err);
//                 console.error(err.stack);
//                 res.status(500).json({ error: 'Internal Server Error' });
//             }
//         });
//     } else {
//         res.redirect('/login');
//     }
// });

// imgprocessRouter.post('/update', (req, res) => {
//     if (req.session.user) {
//         const recordComplianceStatus = 'Non-compliance'; 
//         const loggedInName = req.session.userEmail;

//         const formattedTimestamp = new Intl.DateTimeFormat('en-US', {
//             timeZone: 'Asia/Kuala_Lumpur',
//             year: 'numeric',
//             month: '2-digit',
//             day: '2-digit',
//             hour: '2-digit',
//             minute: '2-digit',
//         }).format(new Date());

//         pool.query('UPDATE table_oss SET compliance_check = $1, created_at = $2, created_by = $3 WHERE compliance_check = $4', ['Compliance', formattedTimestamp, loggedInName, recordComplianceStatus], (err, result) => {
//             if (!err) {
//                 console.log('Database updated successfully');
//                 // Redirect to the first URL on the client side
                
//                 res.redirect('http://47.250.10.195:8888/');
//                 if (!err) {
//                     console.log('Redirecting to http://47.250.10.195:8888/');
//                 } else {
//                     console.error('Error going to 8888:', err);
//                     res.status(500).json({ error: 'Internal Server Error' });
//                 }
//             } else {
//                 console.error('Error updating records:', err);
//                 res.status(500).json({ error: 'Internal Server Error' });
//             }
//         });
//     } else {
//         res.status(401).json({ error: 'Unauthorized' });
//     }
// });

// module.exports = imgprocessRouter;

const express = require('express');
const imgprocessRouter = express.Router();
const pool = require('../db/db');

imgprocessRouter.get('/', (req, res) => {
    res.set('Cache-Control', 'no-store, must-revalidate');

    if (req.session.user) {
        pool.query('SELECT i.*, v.*, o.* FROM images i JOIN van_users v ON i.van_user_id = v.id JOIN outlets o ON i.outlet_id = o.id WHERE process_status = \'No\'', (err, result) => {
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
        const email = req.session.userEmail;

        const formattedTimestamp = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Kuala_Lumpur',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date());

        pool.query('UPDATE images SET updated_at = $1, updated_by = $2, transition_date = $3, process_date = $4 WHERE process_status = $5',
        [formattedTimestamp, email, formattedTimestamp, formattedTimestamp, 'No'],
        (err, result) => {
            if (!err) {
                console.log('Database updated successfully');                
                res.redirect('http://47.250.10.195:8888?email=' + email);
                if (!err) {
                    console.log('Redirecting to http://47.250.10.195:8888?email=' + email);
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