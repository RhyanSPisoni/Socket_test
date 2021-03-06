const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const routeVM = require('./router/VirtualMachineManager.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/', routeVM);

module.exports = app