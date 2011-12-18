/**
 * @author tom@0x101.com
 *
 * Implementation of a key-value storage, it implements a 
 * GET interface for doing the basic cache operations that we are going to need:
 *
 *		GET key => Retrieve key from cache
 *
 *		PUT key value => Add a value to the cache
 *
 *		DELETE key => delete a key, also it supports * as key, for flushing all
 *		the cache.
 */
var http = require('http');

var CacheServer = require('./core/CacheServer').CacheServer;
var cacheServer = new CacheServer();

if ( cacheServer.canServe() ) {
	var port = cacheServer.getPort()
	
	http.createServer(function(req, res) {
			console.log('serving request...');
			cacheServer.serve(req, res);
		}).listen(port, "127.0.0.1");

	console.log('Cache server running at http://127.0.0.1:' + cacheServer.getPort());
}
