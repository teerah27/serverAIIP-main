const express = require("express");
const pool = require('../db/db');

const getOneVanUserRouter = express.Router();

getOneVanUserRouter.post('/', async (req,res) => {
const { van_user_id } = req.body;

    try {
        const query = `
        select * from van_user ud
        WHERE id = $1
        `;
        
        const values = [ van_user_id ];

        await pool.query(query, values, (err,ress) => {
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

module.exports = getOneVanUserRouter;