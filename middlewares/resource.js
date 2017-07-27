var url = require('url'),
	path = require('path'),
	error = require('./error');

module.exports = function (req, res, next) {

	res.sendFile(process.cwd() + '/compiled' + req.path + (!path.parse(req.path).ext.length ? '/index.html' : ''), {}, function (err) {
		if(err) {
			console.log(err);
			error(404, req, res);
		}
	});
};
