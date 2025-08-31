class APIFeatures {
  constructor(query, queryString) {
    // console.log('query ', query, 'queryString', queryString);
    this.query = query;
    this.queryString = queryString;
  }
  // 127.0.0.1:5000/api/v1/tours?difficulty=easy&duration=5&price[lt]=2000
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    console.log(queryObj);
    // 1A) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    this.query = this.query.find(JSON.parse(queryStr)); //Return entire array
    // let query = Tour.find(JSON.parse(queryStr)); Return entire array
    // console.log(this);

    return this;
  }
  sort() {
    if (this.queryString.sort) {
      console.log(this.queryString.sort);

      const sortBy = this.queryString.sort.split('').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    // console.log('Sort By ', this);

    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' '); //127.0.0.1:5000/api/v1/tours?fields=-price,-name,-description  OR ?fields=price,name,description
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v'); //Search except by __V
    }
    // console.log(this);

    return this;
  }
  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit; //127.0.0.1:5000/api/v1/tours?page=2&limit=3
    this.query = this.query.skip(skip).limit(limit);
    // console.log(this);

    return this;
  }
}

module.exports = APIFeatures;
