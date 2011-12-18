var Request = require('../fw/Request').Request;

/**
 * @author tom@0x101.com
 *
 * Generates the params that we need for storing or retrieving
 * a request in the cache from a ServerRequest object.
 *
 * @class CacheRequest
 * @param ServerRequest req
 *
 */
function CacheRequest(req) {

	// The request will be something like:
	// PUT /12121212?'{prop1:%20val1,%20prop2:%20val2, ...}'
	Request.call(this, req);

	/**
	 * @var Array validMethods
	 */
	this.validMethods = ['PUT', 'DELETE', 'GET'];
	
	/**
	 * The key of the value that we want to store.
	 * @var String key
	 */
	this.key = this.path;
	
	/**
	 * The value that we want to store.
	 * @var String value
	 */
	this.value = this.params;
};

CacheRequest.prototype = new Request(); 

/**
 * @return Boolean
 */
CacheRequest.prototype.isValidMethod = function() {
	return this.validMethods.indexOf(this.request.method) > -1; 
};

/**
 * Don't allow empty keys or non-supported methods.
 *
 * @return Boolean
 */
CacheRequest.prototype.isValid = function() {
	return this.isValidMethod() && this.key !== '';
};

/**
 * @return String key
 */
CacheRequest.prototype.getKey = function() {
	return this.key;
};

/**
 * @return String value 
 */
CacheRequest.prototype.getValue = function() {
	return this.value;
};

exports.CacheRequest = CacheRequest;
