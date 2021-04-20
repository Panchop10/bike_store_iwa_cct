const path = require('path'); //The path module provides utilities for working with file and directory paths
const fs = require('fs'); //This module allows to work witht the file system: read and write files back
const xml2js = require('xml2js'); //This module does XML to JSON conversion and also allows us to get from JSON back to XML
const xmlParse = require('xslt-processor').xmlParse; //This module allows us to work with XML files
const xsltProcess = require('xslt-processor').xsltProcess; //The same module allows us to utilise XSL Transformations
const { v4: uuid_v4 } = require('uuid');
const { exit } = require('process');

var Product = require('../models/product.model')


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