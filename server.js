const bot = require("./app.js");
const express = require('express');
const packageInfo = require('./package.json');
var port = 8080;
var app = express();

app.get('/', function (req, res) {
  res.json({ version: packageInfo.version });
});

app.listen(process.env.PORT || port, () => {
  console.log('App listening on port 8080!');
});

