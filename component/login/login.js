const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db/db');

const loginRouter = express.Router();

loginRouter.get('/', (req, res) => {
  res.render('login');
});

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  const formattedTimestamp = new Date().toISOString().slice(0, 16).replace("T", " ");

  try {
    const query = 'SELECT * FROM user_details WHERE email = $1';
    const { rows } = await pool.query(query, [email]);

    if (rows.length === 0) {
      console.error('User not found');
      return res.status(401).redirect('/login?notreg=true');
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.error('Password does not match');
      return res.status(401).redirect('/login?fail=true');
    }

    const updateLastLoginQuery = 'UPDATE user_details SET last_login = $1 WHERE email = $2';
    await pool.query(updateLastLoginQuery, [formattedTimestamp, email]);
    req.session.user = user;
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).redirect('/login');
  }
});

loginRouter.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
    }
    res.redirect('/login');
  });
});

module.exports = loginRouter;