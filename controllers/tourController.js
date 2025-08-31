// const fs = require('fs');
const Tour = require('./../models/tourModels');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

//Check name and price using middleware
// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price',
//     });
//   }
//   next();
// };

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is : ${val}`);
  // if (req.params.id * 1 > tours.length) {
  //   //here, return plays imp. role.
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid ID',
  //   });
  // }
  next();
};

// exports.getAllTours = (req, res) => {
//   console.log(req.requestTime);

//   res.status(200).json({
//     status: 'success',
//     requestedAt: req.requestTime,
// results: tours.length,
// data: {
//   tours,
// },
//   });
// };

// API NOT AVAILABLE
// exports.aliasTopTours = (req, res, next) => {
//   req.query.limit = '5';
//   req.query.sort = '-ratingsAverage,price';
//   req.query.fields = 'name, price, ratingsAverage, summary, difficulty';
//   next();
// };

exports.getAllTours = factory.getAll(Tour);
// exports.getAllTours = catchAsync(async (req, res, next) => {
// BUILD QUERY
// 1A) filtering
// const queryObj = { ...req.query };
// const excludedFields = ['page', 'sort', 'limit', 'fields'];
// excludedFields.forEach((el) => delete queryObj[el]);

// console.log(req.query, queryObj);
// // 1A) Advanced filtering
// let queryStr = JSON.stringify(queryObj);
// queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
// console.log(JSON.parse(queryStr));

// let query = Tour.find(JSON.parse(queryStr)); //Return entire array

//2) Sorting
// if (req.query.sort) {
//   const sortBy = req.query.sort.split(',').join(' ');
//   query = query.sort(sortBy);
//   //127.0.0.1:5000/api/v1/tours?sort=price,ratingAverage    OR -price
// } else {
//   query = query.sort('-createdAt');
// }
// console.log(req.query.sort);

// 3) Field limiting
// if (req.query.fields) {
//   const fields = req.query.fields.split(',').join(' ');
//   //127.0.0.1:5000/api/v1/tours?fields=-price,-name,-description  OR ?fields=price,name,description
//   query = query.select(fields);
// } else {
//   query = query.select('-__v');
//   //Search except by __V
// }

// Pagination
// const page = req.query.page * 1 || 1;
// const limit = req.query.limit * 1 || 100;
// const skip = (page - 1) * limit;
// //127.0.0.1:5000/api/v1/tours?page=2&limit=3
// query = query.skip(skip).limit(limit);

// if (req.query.page) {
//   const numTour = await Tour.countDocuments(); //Counts document in api
//   if (skip >= numTour) throw new Error("'This page does not exits!!!"); //127.0.0.1:5000/api/v1/tours?page=5&limit=3
// }

// EXECUTE QUERY

//   const features = new APIFeatures(
//     Tour.find().populate({
//       path: 'reviews',
//       select: 'review rating user',
//     }),
//     req.query
//   )
//     .filter()
//     .sort()
//     .limitFields()
//     .pagination();

//   const tours = await features.query;
//   // console.log('Tours responses ', tours);

//   // SEND QUERY
//   res.status(200).json({
//     status: 'success',
//     results: tours.length,
//     data: {
//       tours,
//     },
//   });
// });

// exports.getTour = (req, res) => {
// const id = req.params.id * 1;
// const tour = tours.find((el) => el.id == id);
// // if (!tour) {
// res.status(200).json({
//   status: 'success',
//   data: {
//     tour,
//   },
// });
// };

exports.getTour = factory.getOne(Tour, { path: 'reviews' });
// If there is issues regargin guides then use origin code.
// exports.getTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findById(req.params.id)
//     .populate({
//       path: 'guides',
//       select: '-__v -passwordChangedAt',
//     })
//     .populate('reviews'); //Return specific id  => Tour.findOne({_id:req.params.id})
//   if (!tour) {
//     return next(new AppError('NO tour found with that ID', 404));
//   }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });
// });

// exports.createTour = (req, res) => {
//   console.log(req.body);
//   res.send('Done');
// const newId = tours[tours.length - 1].id + 1;
// const newTour = Object.assign({ id: newId }, req.body);
// tours.push(newTour);
// fs.writeFile(
//   `${__dirname}/dev-data/tours-simple.json`,
//   JSON.stringify(tours),
//   (err) => {
//     res.status(201).json({
//       status: 'success',
//       data: {
//         tour: newTour,
//       },
//     });
//   }
// );
// };

exports.createTour = factory.createOne(Tour);
// exports.createTour = catchAsync(async (req, res, next) => {
//   const newTour = await Tour.create(req.body);
//   console.log('newTour', newTour);

//   res.status(201).json({
//     status: 'success',
//     data: {
//       tour: newTour,
//     },
//   });
// });

// exports.updateTour = (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour: '<Updated tour here...>',
//     },
//   });
// };

exports.updateTour = factory.updateOne(Tour);

// exports.updateTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//     //Ref. doc for more info. https://mongoosejs.com/
//     new: true,
//     runValidators: true,
//   });

//   // 404 NOT FOUND ERRORS
//   if (!tour) {
//     return next(new AppError('NO tour found with that ID', 404));
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });
// });

// exports.deleteTour = (req, res) => {
//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// };

// Handler Factory Function : Delete
exports.deleteTour = factory.deleteOne(Tour);
// exports.deleteTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndDelete(req.params.id);
//   if (!tour) {
//     return next(new AppError('NO tour found with that ID', 404));
//   }
//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });

// Pending getting errors Ref. docs.
exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    // { $match: { ratingsAverage: { $gte: 4.5 } } },
    {
      $group: {
        _id: null,
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
  ]);
  console.log('ratingsAverage', stats);

  res.status(200).json({
    status: 'success',
    data: stats,
  });
});

// Not getting response
exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1; //2021
  console.log('req', req).params;

  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: {
          $month: '$startDates',
        },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: {
        month: '$_id',
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        numTourStarts: -1,
      },
    },
    {
      $limit: 6,
    },
  ]);
  console.log('plan', plan);
  res.status(200).json({
    status: 'success',
    data: plan,
  });
});
