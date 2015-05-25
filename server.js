'use strict';

var express = require('express');
var app = express();
var Entry = require('./models/entry_model');
var entriesRouter = express.Router();

require('./routes/api_routes')(entriesRouter);

app.use('/api', entriesRouter); // was apiRoutes

var port = process.env.PORT || 3000;

app.listen(port, function() {
   console.log('Listening on ' + port);
});

