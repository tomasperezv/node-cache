/**
 * Base object a web or node cache server. The prototype with the common
 * functionality is implemented here.
 *
 * @author tom@0x101.com
 */

var sys = require('sys');
var requestWrapper = require('./Request');

Server = function(config) {

	/**
	 * TODO: The configuration should be stored in a different part or at least be
	 * protected.
	 *
	 * @var Object configuration
	 *		configuration.port {Integer} default port for the cache server
	 *		configuration.defaultErrorCode {String} HTTP error code we return if failure
	 *		configuration.defaultOkCode {String} HTTP successful status code
	 *		configuration.defaultHeader {Object}
	 */
	this.configuration = {
		port: 9999,
		defaultErrorCode: 503,
		defaultOkCode: 200,
		defaultHeader: {'Content-Type': 'text/plain'},
		validRequestResponse: ''
	};

	// Override custom properties
	if (typeof config !== 'undefined') {
		for (customProperty in config) {
			if (this.configuration.hasOwnProperty(customProperty)) {
				this.configuration[customProperty] = config[customProperty];
			}
		}
	}
}

/**
 * @param ServerResponse response
 * @param Boolean success
 * @param String result
 */
Server.prototype.writeResponse = function(response, success, result) {

	var errorCode = success ? this.configuration.defaultOkCode : this.configuration.defaultErrorCode;
	response.writeHead(errorCode, this.configuration.defaultHeader);

	if (result !== null) {
		response.write(result)
	}

	response.end();
};

/**
 * @return Boolean  
 */
Server.prototype.canServe = function() {
	return true; 
};

/**
 * @return Boolean
 */
Server.prototype.getPort = function() {
	return this.configuration.port;
};

/**
 * @param Request request
 * @return Boolean
 */
Server.prototype.processRequest = function(request) {
	return this.configuration.validRequestResponse;
};

Server.prototype.buildRequest = function(request) {

	var customRequest = requestWrapper.build(request); 

	return customRequest; 
};

/**
 * Process the request, store/retrieve/delete the cache and writes the header
 * with the HTTP code that corresponds.
 *
 * @param ServerRequest request
 * @param ServerResponse response
 */
Server.prototype.serve = function(request, response) {

	var success = false;
	var result = this.configuration.validRequestResponse;
	var requestWrapper = this.buildRequest(request);

	if ( requestWrapper.isValid() ) {
		result = this.processRequest(requestWrapper);
		success = true;
	}

	this.writeResponse(response, success, result);
};

exports.Server = Server;
