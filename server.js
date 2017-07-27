'use strict';

require('dotenv').config();

var _ = require('lodash'),
	compression = require('compression'),
	resource = require('./middlewares/resource'),
	error = require('./middlewares/error'),
	express = require('express'),
	path = require('path'),
	slash = require('slash'),
	app = express();

app.use(compression());
app.use(express.static(__dirname));
app.use(express.static(__dirname + 'compiled'));
app.use(resource);

app.use(_.partial(error, 404));


var server = app.listen(process.env.WEB_SERVER_PORT);
