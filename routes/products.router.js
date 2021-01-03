const express = require('express');

const router = express.Router();
const controllers = require('../controllers/index');

// categories
router.get('/categories', [], controllers.productCategoryController.show);

// products
router.post('/update/', [], controllers.productsController.update);
router.get('/', [], controllers.productsController.index);
router.get('/:id', [], controllers.productsController.show);
router.post('/', [], controllers.productsController.create);
router.delete('/:id', [], controllers.productsController.destroy);


module.exports = {
  basePath: '/products',
  router,
};