const express = require('express');
const app = express();

var compression = require('compression')
const helmet = require('helmet')
const path = require('path');
const session = require('express-session')
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
// const favicon = require('serve-favicon');

const rateLimit = require("express-rate-limit");
const requestIp = require('request-ip');
const bodyParser = require("body-parser");
const cors = require("cors");


const { authenticateToken, adminAuthenticateToken } = require("./auth/authentication")

require('dotenv').config()


//Socket io
// const http = require("http");
// const server = http.createServer(app);
// const socketIO = require("socket.io");
// const io = socketIO(server, {
//     transports:['polling'],
//     cors: '*'
// })

// io.on('connection', (socket) => { 
//     socket.on("join_room", (data) => {
//       socket.join(data);
//     });
  
//     socket.on("send_message", (data) => {
//         socket.to(data.room).emit("receive_message", data);
//     });

//     //Order placed
//     socket.on("order_placed", (data) => {
//         socket.to(data.room).emit("receive_order", data);
//     });

//     //Realtime order status
//     socket.on("update_order_status", (data) => {
//         socket.to(data.room).emit("get_order_status", data);
//     });
// })
//end of socket io



app.use(cors());
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false
}));

app.use(compression());
app.use(helmet());

app.use(function (req, res, next) {
    //disabling cache
    res.setHeader('Surrogate-Control', 'no-store')
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')
    next();
});

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 30, // limit each IP to 30 requests per windowMs
    statusCode: 500, //change this to 200 so the end user will get a custom msg saying server cant handle this much requests
    message: {
        "text": "limit exceeded"
    }
});
//  apply to all api requests
app.use('/api/v1', limiter);

app.use(session({
    secret: 'ASDew5rtfxcvfga',
    resave: false,
    saveUninitialized: true
}));

app.set('superSecret', process.env.SECRET);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //removing public folder form routes acessing

/*app.use('/resources',express.static(__dirname + '/images'));*/
// ip request
app.use(requestIp.mw())

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//Welcome Route
app.get('/validate', authenticateToken, (req, res) => {
    // res.json(req.user)
    res.send({ "message": "Welcome to ATE Engine...", "authenticate": true })
})

app.get('/superadmin/validate', adminAuthenticateToken, (req, res) => {
    // res.json(req.user)
    res.send({ "message": "Welcome to ATE Engine...", "authenticate": true })
})

//Routes
const adminRoute = require('./routes/adminRoute');
const superadminRoute = require('./routes/superadminRoute');
const uploadRoute = require('./routes/uploadRoute');

const paymentCardRoute = require('./routes/paymentCardRoute');
const stripeProductRoute = require('./routes/stripeProductRoute');
const paymentRoute = require('./routes/paymentRoute');
const UserPaymentCardRoute = require('./routes/userPaymentCardRoute');
const UserPaymentRoute = require('./routes/userPaymentRoute');

const restaurantRoute = require('./routes/restaurantRoute');
const productRoute = require('./routes/productRoute');
const categoryRoute = require('./routes/categoryRoute');
const addonsRoute = require('./routes/addonsRoute');
const comboMenuRoute = require('./routes/comboMenuRoute');
const cuisinesRoute = require('./routes/cuisinesRoute');
const deliveryPeopleRoute = require('./routes/deliveryPeopleRoute');
const restaurantSettingsRoute = require('./routes/restaurantSettingsRoute');
const tableRoute = require('./routes/tableRoute');
const tableReservationRoute = require('./routes/tableReservationRoute');

const userRoute = require('./routes/userRoute');
const orderRoute = require('./routes/orderRoute');
const favouriteRoute = require('./routes/favouriteRoute');
const topBrandsRoute = require('./routes/topBrandsRoute');
const topOfferRoute = require('./routes/topOfferRoute');

app.use('/admin', adminRoute);
app.use('/superadmin', superadminRoute);

app.use('/payment_card', paymentCardRoute);
app.use('/stripe_product', stripeProductRoute);
app.use('/payment', paymentRoute);
app.use('/user_payment_card', UserPaymentCardRoute);
app.use('/user_payment', UserPaymentRoute);


app.use('/restaurant', restaurantRoute);
app.use('/product', productRoute);
app.use('/category', categoryRoute);
app.use('/addons', addonsRoute);
app.use('/combo_menu', comboMenuRoute);
app.use('/cuisines', cuisinesRoute);
app.use('/delivery_people', deliveryPeopleRoute);
app.use('/restaurant_settings', restaurantSettingsRoute);
app.use('/table', tableRoute);
app.use('/table_reservation', tableReservationRoute);

app.use('/user', userRoute);
app.use('/orders', orderRoute);
app.use('/favourites', favouriteRoute);
app.use('/top_brands', topBrandsRoute);
app.use('/top_offers', topOfferRoute);

// app.use(authenticateToken, uploadRoute);
app.use(uploadRoute);

app.get('/download/:filename', authenticateToken, (req, res) => {
    const { filename } = req.params;
    var file = __dirname + '/public/uploads/' + filename;
    console.log(file)
    res.download(file);
})

app.get('/getAvatar/:filename', (req, res) => {
    const { filename } = req.params;
    var file = __dirname + '/public/uploads/' + filename;
    res.download(file);
})

app.get('/viewImage/:filename', (req, res) => {
    const { filename } = req.params;
    var file = __dirname + '/public/uploads/' + filename;
    res.sendFile(file);
})


//Test mail
const testmail = require('./services/nodemailer/test_mail');
app.use(testmail);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        if (process.env.ENV == "production") {
            res.redirect('/500');
        } else {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        }
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    if (process.env.ENV == "production") {
        res.redirect('/500');
    } else {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    }
});


app.listen(process.env.PORT, () => console.log(`ATE engine on live on port ${process.env.PORT}!`))
// server.listen(process.env.SOCKET_PORT, () => console.log(`SOCKET on port ${process.env.SOCKET_PORT}!`))

module.exports = app;

