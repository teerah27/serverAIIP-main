const express = require('express');
const dashboardRouter = express.Router();

dashboardRouter.get('/', (req, res) => {
    res.set('Cache-Control', 'no-store, must-revalidate');

    if (req.session.user) {
        res.render('dashboard');
    } else {
        res.redirect('/login'); 
    }
});

module.exports = dashboardRouter;