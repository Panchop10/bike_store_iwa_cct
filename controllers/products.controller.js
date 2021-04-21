var Product = require('../models/product.model')

module.exports = {
  name: 'productsController',
  /**
   * INDEX PRODUCT
   */
  index: (req, res, next) => {
    let query = {};

    if (req.query.category){
      query = {"category": req.query.category};
    }

    Product.find(query, function (err, users) {
      if (err) {
        res.status(400).json(err); 
      } 
      res.json(users);
    });
  },

  /**
   * SHOW PRODUCT
   */
  show: (req, res, next) => {
    Product.find( { "_id": req.params.id } , function (err, users) {
      if (err) {
        res.status(400).json(err); 
      } 
      res.json(users);
    });
  },

  /**
   * CREATE PRODUCT
   */
  create: (req, res, next) => {
    var product = new Product(req.body);
    product.save(function (err, user) { 
        if (err) { 
            res.status (400).json(err);
        }
        res.redirect('/?sucess=ok');
    });
  },

  /**
   * UPDATE PRODUCT
   */
  update: (req, res, next) => {
    Product.findByIdAndUpdate({_id: req.body._id}, req.body, function (err, users) {
      if (err) {
        res.status(400).json(err); 
      }
      res.redirect('/?sucess=ok');
    });
  },

  /**
   * DELETE PRODUCT
   */
  destroy: (req, res, next) => {
    Product.findByIdAndRemove({_id: req.params.id}, function (err, users) {
      if (err) {
        res.status(400).json(err); 
      } 
      res.status(200).send({});
      res.end();
    });
  },
};