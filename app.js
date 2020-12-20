const http = require('http'); //This module provides the HTTP server functionalities
const path = require('path'); //The path module provides utilities for working with file and directory paths
const express = require('express'); //This module allows this app to respond to HTTP Requests, defines the routing and renders back the required content
const fs = require('fs'); //This module allows to work witht the file system: read and write files back

const app = express(); //We set our routing to be handled by Express
//const routes = require('./app/routes/index'); // get routes from folder routes
//routes.map((x) => app.use(x.basePath, x.router)); // load routes in the server


const server = http.createServer(app); //This is where our server gets created

app.use(express.static(path.resolve(__dirname, 'views'))); //We define the views folder as the one where all static content will be served
app.use(express.urlencoded({extended: true})); //We allow the data sent from the client to be coming in as part of the URL in GET and POST requests
app.use(express.json()); //We include support for JSON that is coming from the client

app.get('/', function(req, res) {
    res.render('index');
});

//router.use(express.static(path.resolve(__dirname, 'views'))); //We define the views folder as the one where all static content will be served
//router.use(express.urlencoded({extended: true})); //We allow the data sent from the client to be coming in as part of the URL in GET and POST requests
//router.use(express.json()); //We include support for JSON that is coming from the client


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    var addr = server.address();
    console.log("Server listnening at", addr.address + ":" + addr.port);
});