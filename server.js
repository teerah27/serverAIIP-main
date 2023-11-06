const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const registerRouter = require('./component/register/register');
const loginRouter = require('./component/login/login');
const dashboardRouter = require('./component/dashboard/dashboard');
const databaseRouter = require('./component/database/database');
const rejectRouter = require('./component/reject/reject');
const imgprocessRouter = require('./component/img_process/img_process');
const manageRouter = require('./component/manage/manage');
const outletRouter = require('./component/outlet/outlet');

//Imran
const getVanUserRouter = require('./component/mobile/getVanUser');
const getOneVanUserRouter = require('./component/mobile/getOneVanUser');
const getUserDetailsRouter = require('./component/mobile/getUserDetails'); 
const insertImageRouter = require('./component/mobile/insertImage');
const registerVanUserRouter = require('./component/mobile/registerVanUser');
const updateLastLoginRouter = require('./component/mobile/updateLastLogin');
var corsOptions = {
    origin: `http://localhost:8081`
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(express.static('public/css'));
app.use(express.static('public/img'));
app.use(express.static('public/audio'));
app.use(express.static('views'));

//for Flutter usage
app.use('/insert', insertImageRouter);
app.use('/get_user_details', getUserDetailsRouter);
app.use('/get_van_user', getVanUserRouter);
app.use('/get_one_van_user', getOneVanUserRouter);
app.use('/register_mobile', registerVanUserRouter);
app.use('/update_last_login', updateLastLoginRouter);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: false }));

// Register view
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('login');
});

// Routes
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/dashboard', dashboardRouter);
app.use('/database', databaseRouter);
app.use('/reject', rejectRouter);
app.use('/img_process', imgprocessRouter);
app.use('/outlet', outletRouter);
app.use('/manage', manageRouter);

app.listen(3030, () => {
  console.log('Server started on http://localhost:3030');
});