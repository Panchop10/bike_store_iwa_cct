const http = require('http'); //This module provides the HTTP server functionalities
const path = require('path'); //The path module provides utilities for working with file and directory paths
const express = require('express'); //This module allows this app to respond to HTTP Requests, defines the routing and renders back the required content
const fs = require('fs'); //This module allows to work witht the file system: read and write files back
const xmlParse = require('xslt-processor').xmlParse; //This module allows us to work with XML files
const xsltProcess = require('xslt-processor').xsltProcess; //The same module allows us to utilise XSL Transformations
const xml2js = require('xml2js'); //This module does XML to JSON conversion and also allows us to get from JSON back to XML

const app = express(); //We set our routing to be handled by Express

const server = http.createServer(app); //This is where our server gets created

app.use(express.static(path.resolve(__dirname, 'views'))); //We define the views folder as the one where all static content will be served
app.use(express.urlencoded({extended: true})); //We allow the data sent from the client to be coming in as part of the URL in GET and POST requests
app.use(express.json()); //We include support for JSON that is coming from the client

// Add Routes and tasks
const routes = require('./routes/index'); // get routes from folder routes
routes.map((x) => app.use(x.basePath, x.router)); // load routes in the server

// app.get('/', function(req, res) {
//     res.render('index');
// });

app.get('/products', function(req, res) {

    res.writeHead(200, {'Content-Type': 'text/html'}); //We are responding to the client that the content served back is HTML and the it exists (code 200)

    var xml = fs.readFileSync('products/ProductsBikeShop.xml', 'utf8'); //We are reading in the XML file
    var xsl = fs.readFileSync('products/TableProducts.xsl', 'utf8'); //We are reading in the XSL file

    var doc = xmlParse(xml); //Parsing our XML file
    var stylesheet = xmlParse(xsl); //Parsing our XSL file

    var result = xsltProcess(doc, stylesheet); //This does our XSL Transformation

    res.end(result.toString()); //Send the result back to the user, but convert to type string first

});

//router.use(express.static(path.resolve(__dirname, 'views'))); //We define the views folder as the one where all static content will be served
//router.use(express.urlencoded({extended: true})); //We allow the data sent from the client to be coming in as part of the URL in GET and POST requests
//router.use(express.json()); //We include support for JSON that is coming from the client


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    var addr = server.address();
    console.log("Server listnening at", addr.address + ":" + addr.port);
});