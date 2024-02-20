var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
require('./client/mongo');
const cors = require('cors');

var usersRouter = require('./routes/users');
var feedsRouter = require('./routes/feeds');
var jobsRouter = require('./routes/jobs');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/users', usersRouter);
app.use('/jobs', jobsRouter);
app.use('/feeds', feedsRouter);

module.exports = app;
