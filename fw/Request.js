/**
 * Basic object for encapsulating a GET request, will be used for managing
 * the requests that the webserver receives.
 *
 * @author tom@0x101.com
 */
function Request(request) {
	/**
	 * @var Object ServerRequest
	 */
	this.request = request;

	this.path = '';
	this.params = '';
	this.url = '';

	if (typeof this.request !== 'undefined') {

		this.url = request.url;

		var tmpParams = require('url').parse(request.url);
		console.log(request.url);
	
		if (typeof tmpParams.pathname !== 'undefined') {
			this.path = tmpParams.pathname.replace(/\//g, '');
		}
	
		if (typeof tmpParams.search !== 'undefined') {
			this.params = tmpParams.search.replace(/\?/g, '');
		}
	}
}

/**
 * Is a valid request?
 *
 * @return Boolean
 */
Request.prototype.isValid = function() {
	return typeof this.request !== 'undefined'; 
};

/**
 * @return String
 */
Request.prototype.getPath = function() {
	return this.path;
};

/**
 * @return String
 */
Request.prototype.getParams = function() {
	return this.params;
};

/**
 * @return String
 */
Request.prototype.getUrl = function() {
	return this.url;
}

/**
 * @return String
 */
Request.prototype.getMethod = function() {
	var method = '';

	if (this.isValid) {
		method = this.request.method;
	}

	return method;
};

exports.Request = Request;
