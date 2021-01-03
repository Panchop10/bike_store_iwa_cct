const express = require('express');

const router = express.Router();
const controllers = require('../controllers/index');

// homepage
router.get('/', [], controllers.homepageController.index);

module.exports = {
  basePath: '/',
  router,
};