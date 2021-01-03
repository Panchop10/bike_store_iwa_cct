const express = require('express');

const router = express.Router();
const controllers = require('../controllers/index');

router.delete('/:id', [], controllers.productsController.destroy);

module.exports = {
  basePath: '/products',
  router,
};