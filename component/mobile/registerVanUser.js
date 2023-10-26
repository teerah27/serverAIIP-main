const express = require('express');
const pool = require('../db/db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid'); 
const registrationRouter = express.Router();

registrationRouter.post('/register_van_user', async (req, res) => {
  const { first_name, last_name, address, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const checkEmailQuery = 'SELECT email FROM van_user WHERE email = $1';
  const emailExists = await pool.query(checkEmailQuery, [email]);

  if (emailExists.rows.length > 0) {
    res.json({
            message: 'email existed',
        })
  } else {
    const userId = uuidv4();
    const formattedTimestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');

    try {
      const insertQuery = `
        INSERT INTO van_user (id, first_name, last_name, address, email, password, first_register)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;
      const values = [userId, first_name, last_name, address, email, hashedPassword, formattedTimestamp];

      await pool.query(insertQuery, values);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }
});

module.exports = registrationRouter;