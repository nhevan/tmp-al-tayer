var ERRORS = {
	404: '404: Page not Found',
	500: '500: Server Error'
};

module.exports = function (type, req, res, next) {

	res.status(type).send(ERRORS[type]);
};
