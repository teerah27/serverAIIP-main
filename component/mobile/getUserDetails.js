const express = require("express");
const pool = require('../db/db');

const getUserDetailsRouter = express.Router();

getUserDetailsRouter.get('/', async (req,res) => {
    try {
        const query = `
        select * from user_details ud;
        `;

        await pool.query(query, (err,ress) => {
            if (err) {
                console.log(`Error in getUserDetails.js: `, err);
                res.status(500).send(`Error in getUserDetails.js file: ${err}`);
                return;
            }
            res.json(ress.rows);
            return;
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error, in getUserDetails.js file');
    }
});

module.exports = getUserDetailsRouter;