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
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  // .post(tourController.checkBody, tourController.createTour); //Check name and price using middleware
  .post(tourController.createTour);

router
  .route('/:id/')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
