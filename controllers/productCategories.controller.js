var Product = require('../models/product.model')

module.exports = {
  name: 'productCategoryController',
  /**
   * SHOW CATEGORY
   */
  show: (req, res, next) => {
    Product.distinct("category", function (err, users) {
      if (err) {
        res.status(400).json(err); 
      } 
      res.json(users);
    });
  },
};