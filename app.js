var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware untuk mengatur header "Access-Control-Allow-Origin" untuk semua permintaan
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Mengizinkan akses dari semua domain (*)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Metode HTTP yang diizinkan
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Header yang diizinkan
    next();
});

app.use('/', indexRouter);
app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.json({
        status: 404,
        message: "The path you are looking for was not found"
    })
});

module.exports = app;
