const path = require('path'); //The path module provides utilities for working with file and directory paths
const fs = require('fs'); //This module allows to work witht the file system: read and write files back
const xml2js = require('xml2js'); //This module does XML to JSON conversion and also allows us to get from JSON back to XML
const xmlParse = require('xslt-processor').xmlParse; //This module allows us to work with XML files
const xsltProcess = require('xslt-processor').xsltProcess; //The same module allows us to utilise XSL Transformations
const { v4: uuid_v4 } = require('uuid');
const { exit } = require('process');


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
   * INDEX PRODUCT
   */
  index: (req, res, next) => {
    res.writeHead(200, {'Content-Type': 'text/html'}); //We are responding to the client that the content served back is HTML and the it exists (code 200)

    var xml = fs.readFileSync('products/ProductsBikeShop.xml', 'utf8'); //We are reading in the XML file
    var xsl = fs.readFileSync('products/TableProducts.xsl', 'utf8'); //We are reading in the XSL file

    var doc = xmlParse(xml); //Parsing our XML file
    var stylesheet = xmlParse(xsl); //Parsing our XSL file

    var result = xsltProcess(doc, stylesheet); //This does our XSL Transformation

    res.end(result.toString()); //Send the result back to the user, but convert to type string first
  },

  /**
   * SHOW PRODUCT
   */
  show: (req, res, next) => {
    xmlFileToJs('../products/ProductsBikeShop.xml', function (err, result) {
      if (err) throw (err);
      
      var objResp = {};
      
      // search product by the id sent.
      var countCategory = 0;
      var countElement = 0;
      result.products.category.forEach(categoryElement => {
        categoryElement.product.forEach(productElement => {
          if (productElement.id[0] === req.params.id) {
            objResp = result.products.category[countCategory].product[countElement];
            objResp["category"] = countCategory;
            }
            countElement++;
        });
        countCategory++;
        countElement = 0;
      });

      //sent an empty object if there is no match.
      res.status(200).send(objResp);
      res.end();
    });
  },

  /**
   * CREATE PRODUCT
   */
  create: (req, res, next) => {
    xmlFileToJs('../products/ProductsBikeShop.xml', function (err, result) {
      if (err) throw (err);
        
      result.products.category[req.body.category].product.push({
        'id': uuid_v4(),
        'title': req.body.title,
        'description': req.body.description,
        'price': req.body.price,
        'image': req.body.image,
      });

      // console.log(JSON.stringify(result, null, "  "));

      jsToXmlFile('../products/ProductsBikeShop.xml', result, function(err){
        if (err) { 
          //console.log(err);
          res.redirect('/?sucess=fail');
        }
      });
    });

    res.redirect('/?sucess=ok');
  },

  /**
   * UPDATE PRODUCT
   */
  update: (req, res, next) => {
    xmlFileToJs('../products/ProductsBikeShop.xml', function (err, result) {
      if (err) throw (err);
        
      var countCategory = 0;
      var countElement = 0;
      result.products.category.forEach(categoryElement => {
          categoryElement.product.forEach(productElement => {
            if (productElement.id[0] === req.body.id) {
              
              // delete the product if the category has changed, and create a new one with the values given in the new category
              if (req.body.category != countCategory) {
                delete result.products.category[countCategory].product[countElement]

                result.products.category[req.body.category].product.push({
                  'id': req.body.id,
                  'title': req.body.title,
                  'description': req.body.description,
                  'price': req.body.price,
                  'image': req.body.image,
                });
              }
              // update values of the product
              else {
                result.products.category[countCategory].product[countElement].title = req.body.title;
                result.products.category[countCategory].product[countElement].price = req.body.price;
                result.products.category[countCategory].product[countElement].image = req.body.image;
                result.products.category[countCategory].product[countElement].description = req.body.description;
              }
            }
            countElement++;
          });
          countCategory++;
          countElement = 0;
      });
      //console.log(JSON.stringify(result, null, "  "));

      jsToXmlFile('../products/ProductsBikeShop.xml', result, function(err){
          if (err) console.log(err);
      });
    });

    res.redirect('/?sucess=ok');
  },

  /**
   * DELETE PRODUCT
   */
  destroy: (req, res, next) => {
    xmlFileToJs('../products/ProductsBikeShop.xml', function (err, result) {
        if (err) throw (err);
        
        var countCategory = 0;
        var countElement = 0;
        result.products.category.forEach(categoryElement => {
            categoryElement.product.forEach(productElement => {
                if (productElement.id[0] === req.params.id) {
                    delete result.products.category[countCategory].product[countElement]
                }
                countElement++;
            });
            countCategory++;
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