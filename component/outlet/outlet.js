const express = require('express');
const outletRouter = express.Router();
const pool = require('../db/db');
const { v4: uuidv4 } = require('uuid');

outletRouter.get('/', (req, res) => {
    res.render('outlet');
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

        res.status(200).send('success');
    } catch (error) {
        console.error(error); 
        res.status(500).send('Internal server error: ' + error.message); 
    }
});

module.exports = outletRouter;