const mongoose = require('mongoose');
const fs = require('fs');
// const app = require('./app');
const Tour = require('./../../models/tourModels');
const User = require('./../../models/userModels');
const Review = require('./../../models/reviewModels');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); //it will read variable from config.env and save into Node.js env. variable file.

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
    console.log('DB connection successful!!!');
  })
  .catch((err) => {
    console.error('connection error:', err);
  });

//   READ JSON FILE  [IMPORTING DEVELOPMENT DATA]
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    await Review.create(reviews);
    await User.create(users);
    console.log('Data successfully loaded');
  } catch (error) {
    console.log('Error while loading Data ', error);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await Review.deleteMany();
    await User.deleteMany();
    console.log('Data successfully deleted');
  } catch (error) {
    console.log('Error while deleting data ', error);
  }
  process.exit();
};

console.log(process.argv);

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

// node dev-data/data/import-dev-data.js --import   => To import data.
// node dev-data/data/import-dev-data.js --delete   => To delete data.
