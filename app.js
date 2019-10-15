const logger = require('./config/logger/logger');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const session = require('express-session');
// Custom Middleware Imports
const cors = require('./middleware/cors');
const app = express();

const config = require('./config/config');
const mongoose = require('mongoose');

// API location
const api = require('./routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//use sessions for tracking logins
app.use(
  session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
  })
);

app.use(cors);
app.use('/api', api);
app.get('/', (req, res) => res.send(`API is running`));

app.use((req, res, next) => {
  if (
    (process.env.WORK_ENV === 'production' ||
      process.env.WORK_ENV === 'staging') &&
    req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  next();
});

//Set Port
const port = process.env.PORT || '4000';
app.set('port', port);

const server = http.createServer(app);

mongoose
  .connect(config.getMongoDBURL(), {
    useNewUrlParser: true
  })
  .then(() => {
    server.listen(port, () => logger.info(`Running on localhost : ${port}`));
  });
