const http = require('http'); //This module provides the HTTP server functionalities
const path = require('path'); //The path module provides utilities for working with file and directory paths
const express = require('express'); //This module allows this app to respond to HTTP Requests, defines the routing and renders back the required content

const app = express(); //We set our routing to be handled by Express

const server = http.createServer(app); //This is where our server gets created

app.use(express.static(path.resolve(__dirname, 'views'))); //We define the views folder as the one where all static content will be served
app.use(express.urlencoded({extended: true})); //We allow the data sent from the client to be coming in as part of the URL in GET and POST requests
app.use(express.json()); //We include support for JSON that is coming from the client

// Add Routes
const routes = require('./routes/index'); // get routes from folder routes
routes.map((x) => app.use(x.basePath, x.router)); // load routes in the server

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    var addr = server.address();
    console.log("Server listnening at", addr.address + ":" + addr.port);
});