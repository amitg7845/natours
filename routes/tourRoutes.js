const express = require('express');

const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
// const {getAllTours} = require('./../controllers/tourController');
// const reviewController = require('./../controllers/reviewController');
const reviewRouter = require('./../routes/reviewRoutes');
const router = express.Router();

// POST /tour/654sf/reviews
// Get /tour/654sf/reviews
// Get /tour/654sf/reviews/654asdf
// Reviews
// router
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview
//   );
// NESTED ROUTES WITH EXPRESS
router.use('/:tourId/reviews', reviewRouter);

// This Param middleware is works for source contains in url eg. 127.0.0.1:5000/api/v1/tours/4
// router.param('id', tourController.checkID);

// API:Aliasing   ||  API NOT AVAILABLE
// router
//   .route('./top-5-cheap')P
//   .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan,
  );

// Geospatial Queries: Finding tours within radius
router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);
//  /tours-within?distance=223&center=-40,45&unit=mi
//  /tours-within/223/center/-40,45/unit/mi

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
  .route('/')
  .get(tourController.getAllTours)
  // .post(tourController.checkBody, tourController.createTour); //Check name and price using middleware
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour,
  );

router
  .route('/:id/')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour,
  );

module.exports = router;
