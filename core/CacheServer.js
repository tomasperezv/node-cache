/**
 * @author tom@0x101.com
 * 
 * The cache server object extends from the basic server object, and provides
 * the functionality for generating the basic RESTFUL API, for storing values.
 */

var sys = require('sys');
var cacheStrategy = require('./CacheStrategy');
var Server = require('../fw/Server').Server;

function CacheServer() {
	Server.call(this);
}

CacheServer.prototype = new Server();

/**
 * @param CacheRequest cacheRequest
 * @return Boolean
 */
CacheServer.prototype.processCacheRequest = function(cacheRequest) {

	var result = null; 

	if ( cacheStrategy.isEnabled() ) {

		result = '';

		var key = cacheRequest.getKey();
		var value = cacheRequest.getValue();

		switch ( cacheRequest.getMethod() ) {
	
			case 'PUT':
				cacheStrategy.set(key, value);
				// TODO: move the relation between the server and the
				// console to another layer for avoiding coupling between the
				// logic of the server and the output.
				console.log('set ' + key + ' = ' + value);
				break;
			
			case 'GET':		
				result = cacheStrategy.get(key);
				console.log('get ' + key + ' => ' + result);
				break;
	
			case 'DELETE':
				// The invalidate method provides a way for flushing all the
				// cache passing '*' as key
				cacheStrategy.invalidate(key);
				console.log('delete ' + key);
				break;
			
			case 'POST':
				// We could implement multiset with the POST method, but is not
				// included for the scope of this POC.
	
			default:
				// Unknown request
				break;
		}
	}

	return result;
};

/**
 * Process the request, store/retrieve/delete the cache and writes the header
 * with the HTTP code that corresponds.
 *
 * @param ServerRequest request
 * @param ServerResponse response
 */
CacheServer.prototype.serve = function(request, response) {

	var success = false;
	var result = '';

	var CacheRequest = require('./CacheRequest');
	var cacheRequest = new CacheRequest.CacheRequest(request);

	if ( cacheRequest.isValid() ) {
		result = this.processCacheRequest(cacheRequest);
		success = result !== null;

	} else {
		console.log('invalid request');
	}

	this.writeResponse(response, success, result);
};

exports.CacheServer = CacheServer;
