const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); //it will read variable from config.env and save into Node.js env. variable file.
const app = require('./app');

// CATCHING UNCAUGHT EXCEPTIONS AND INSIDE MIDDLEWARE ERROR CAUGHT BY CALLING API
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// Environment variable
// console.log(app.get('env'));
// console.log(process.env);
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    // To get rid from dependencies warning.
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log(con.connect);
    console.log('DB connection successful (server) !!!');
  });

// const testTour = new Tour({
//   name: 'The Park Camper',
//   price: 500,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((error) => {
//     console.log('ERROR ', error);
//   });

//   STARTS SERVER
const port = 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// ERROR OUTSIDE EXPRESS: UNHANDLED REJECTIONS TRY WITH WRONG PASSWORD
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION SHUTTING DOWN...');

  server.close(() => {
    process.exit(1);
  });
});
