'use strict';

var express = require('express');
var app = express();
var entriesRouter = express.Router();

var apiRoutes = require('../routes/api_routes');

apiRoutes(entriesRouter);

app.use('/api', entriesRouter); // was apiRoutes

var port = process.env.PORT || 3000;

app.listen(port, function() {
   console.log('Listening on ' + port);
});

