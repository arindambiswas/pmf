var fs = require("fs");
var host = "127.0.0.1";
var port = 8888;
var express = require("express");

var app = express();
app.use(app.router); //use both root and other routes below
app.use('/', express.static(__dirname + "/public")); //use static files in ROOT/public folder

app.listen(port, host);
