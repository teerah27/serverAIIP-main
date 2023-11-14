const express = require('express');
const dashboardRouter = express.Router();

dashboardRouter.get('/', (req, res) => {
    res.set('Cache-Control', 'no-store, must-revalidate');

    if (req.session.user) {
        // Assuming req.session.user contains user data
        res.render('dashboard', { user: req.session.user });
    } else {
        res.redirect('/login'); 
    }
});

module.exports = dashboardRouter;