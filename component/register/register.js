const express = require('express');
const pool = require('../db/db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid'); 
const registrationRouter = express.Router();

registrationRouter.get('/', (req, res) => {
  res.render('register');
});

registrationRouter.post('/form', async (req, res) => {
  const { first_name, last_name, age, address, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const checkEmailQuery = 'SELECT email FROM user_details WHERE email = $1';
  const emailExists = await pool.query(checkEmailQuery, [email]);

  if (emailExists.rows.length > 0) {
    res.redirect('/register?error=email-in-use');
  } else {
    const userId = uuidv4();
    const formattedTimestamp = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kuala_Lumpur',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date());

    try {
      const insertQuery = `
        INSERT INTO user_details (id, first_name, last_name, age, address, email, password, first_register)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `;
      const values = [userId, first_name, last_name, age, address, email, hashedPassword, formattedTimestamp];

      await pool.query(insertQuery, values);

      res.redirect('/register?success=true');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }
});

module.exports = registrationRouter;
