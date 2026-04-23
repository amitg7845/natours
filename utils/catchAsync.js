// Catching Errors in Async Functions  //IT IS BASICALLY TRY CATCH BLOCK
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
