const path = require('path'); //The path module provides utilities for working with file and directory paths
const fs = require('fs'); //This module allows to work witht the file system: read and write files back
const xml2js = require('xml2js'); //This module does XML to JSON conversion and also allows us to get from JSON back to XML

// Function to read in XML file and convert it to JSON
function xmlFileToJs(filename, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  fs.readFile(filepath, 'utf8', function(err, xmlStr) {
    if (err) throw (err);
    xml2js.parseString(xmlStr, {}, cb);
  });
}

//Function to convert JSON to XML and save it
function jsToXmlFile(filename, obj, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  var builder = new xml2js.Builder();
  var xml = builder.buildObject(obj);
  fs.unlinkSync(filepath);
  fs.writeFile(filepath, xml, cb);
}

module.exports = {
  name: 'productsController',
  /**
   * DELETE PRODUCT
   */
  destroy: (req, res, next) => {
    xmlFileToJs('../products/ProductsBikeShop.xml', function (err, result) {
        if (err) throw (err);
        
        var countSection = 0;
        var countElement = 0;
        result.products.section.forEach(sectionElement => {
            sectionElement.product.forEach(productElement => {
                if (productElement.id[0] === req.params.id) {
                    delete result.products.section[countSection].product[countElement]
                }
                countElement++;
            });
            countSection++;
            countElement = 0;
        });
        //console.log(JSON.stringify(result, null, "  "));

        jsToXmlFile('../products/ProductsBikeShop.xml', result, function(err){
            if (err) console.log(err);
        });
    });

    res.status(200).send({});
    res.end();
  },
};