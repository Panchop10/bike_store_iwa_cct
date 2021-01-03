const path = require('path'); //The path module provides utilities for working with file and directory paths
const fs = require('fs'); //This module allows to work witht the file system: read and write files back
const xml2js = require('xml2js'); //This module does XML to JSON conversion and also allows us to get from JSON back to XML
const xmlParse = require('xslt-processor').xmlParse; //This module allows us to work with XML files
const xsltProcess = require('xslt-processor').xsltProcess; //The same module allows us to utilise XSL Transformations

// Function to read in XML file and convert it to JSON
function xmlFileToJs(filename, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  fs.readFile(filepath, 'utf8', function(err, xmlStr) {
    if (err) throw (err);
    xml2js.parseString(xmlStr, {}, cb);
  });
}

module.exports = {
  name: 'productCategoryController',
  /**
   * SHOW CATEGORY
   */
  show: (req, res, next) => {
    xmlFileToJs('../products/ProductsBikeShop.xml', function (err, result) {
      if (err) throw (err);
        
      // create object with the values of the categories in the xml and send them as json.
      var keyCategory = 0;
      var resp = {};
      result.products.category.forEach(categoryElement => {
        resp[categoryElement.$.name] = keyCategory;
        keyCategory++;
      });
      res.status(200).send(resp);
      res.end();
    });
  },
};