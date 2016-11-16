const bot = require("./app.js");
const express = require('express');
const http = require("http");
const packageInfo = require('./package.json');
var port = 8080;
var app = express();

//entry point
app.get('/', function (req, res) {
  res.json({ version: packageInfo.version });
});

//listen port
app.listen(process.env.PORT || port, () => {
  console.log('App listening on port 8080!');
});

