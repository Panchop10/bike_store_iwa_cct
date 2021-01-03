const express = require('express');

const router = express.Router();
const controllers = require('../controllers/index');

// products
router.get('/', [], controllers.productsController.show);
router.post('/', [], controllers.productsController.create);
router.delete('/:id', [], controllers.productsController.destroy);

// categories
router.get('/categories', [], controllers.productCategoryController.show);

module.exports = {
  basePath: '/products',
  router,
};