module.exports = {
  name: 'homepageController',
  /**
   * GET HOMEPAGE
   */
  index: (req, res, next) => {
    res.render('index');
  },
};