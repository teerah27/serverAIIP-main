const express = require("express");
const pool = require('../db/db');

const updateLastLoginRouter = express.Router();

updateLastLoginRouter.post('/', async (req,res) => {
    const last_login = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kuala_Lumpur',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());
    const { van_user_id } = req.body;
    try {
        const query = `
        UPDATE public.van_user
        SET last_login = $1
        WHERE id = $2
        `;
        const values = [
            last_login,
            van_user_id,
        ];

        await pool.query(query, values);

        res.json({
            message: 'successfully updated last login.',
            van_user_id: van_user_id,
            inserted_at: createdAt
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error, in updateLastLogin.js file');
    }
});

module.exports = updateLastLoginRouter;