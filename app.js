const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const helmet = require('helmet');
//It is used to set security http headers
const rateLimit = require('express-rate-limit');
const express = require('express');
const morgan = require('morgan');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewsRoutes');

const app = express();
// Setting up Pug in Express
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Middleware
// Serving static files
app.use(express.static(`${__dirname}/public`)); //Serving(Accessing) static file. eg. overview.html, imges. http://127.0.0.1:5000/img/pin.png ,http://127.0.0.1:5000/overview.html
// console.log(process.env.NODE_ENV);  1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());
// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //Ref. 3rd party middleware at morgan github => index.js
}
// Rate requests from same API
const limiter = rateLimit({
  max: 50,
  windowMs: 1 * 60 * 100,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req. body.
app.use(
  express.json({
    limit: '10kb',
  })
);

// Data sanitization against NOSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xssClean());

// Prevent parameter pollutions
app.use(
  hpp({
    whitelist: [
      'duration',
      'price',
      'difficulty',
      'maxGroupSize',
      'ratingQuantity',
      'ratingAverage',
    ],
  })
);

// Middlewares  AND Test middleware
//Custom midleware and always defines midleware bet req. and res. Usually it shuould defines at top.
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log('req.headers', req.headers);
  next();
});

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoints');
// });

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: `Hello message from server side `, app: 'Natours' });
// });

// ROUTE HANDLERS

// app.get('/api/v1/tours', getAllTours);

// Need to check again not working properly
// app.post('/api/v1/tours', createTour);

// app.get('/api/v1/tours/:id/:x/:y', (req, res) => {
//? it indicates optional means if values is not present where ? marks is used means return undefined.
// app.get('/api/v1/tours/:id/', getTour);

// Use patch to update particular property of object and put to entire object
// app.patch('/api/v1/tours/:id', updateTour);

// app.delete('/api/v1/tours/:id', deleteTour);

//Creating and Mounting Multiple Routers And always write at ends.

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

// HANDLING UNHANDLED ROUTES
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find on ${req.originalUrl} this server`, 404));
});

// Global error handling middleware   127.0.0.1:8000//v1/toursklk/
app.use(globalErrorHandler);

module.exports = app;
