/**
 * @author tom@0x101.com
 * 
 * CacheStrategy stores the basic key-values in a simple array. There is a limit
 * in the number of elements that we can store in the cache and if we raise this
 * limit the only approach used is a FIFO, removing the first element from the
 * array. Of course this could be improved a lot, with a LRU for instance.
 */

/**
 * @var Array cache
 */
this.cache = [];

/**
 * @var Integer maxElements
 */
this.maxElements = 1000;

/**
 * @param String key
 * @param String value
 */
this.set = function(key, value) {

	if ( this.cache.length < this.maxElements ) {

		this.cache[key] = value;

	} else {
		// FIFO
		this.cache.shift();
		this.cache[key] = value;
	}

};

/**
 * @param String key
 * @return String|null
 */
this.get = function(key) {
	var value = null;

	if (this.isSet(key)) {
		value = this.cache[key];
	}

	return value;
};

/**
 * @param String key
 */
this.invalidate = function(key) {

	if (key === '*') {
		// Flush completely the cache
		this.cache = [];
	} else if (this.isSet(key)) {
		this.cache = this.cache.splice(key, 1);
	} 

};

/**
 * @return Boolean
 */
this.isEnabled = function() {
	return true;
};

/**
 * Check if a key is stored in the cache.
 *
 * @return Boolean
 */
this.isSet = function(key) {
	return typeof this.cache[key] !== 'undefined';
};
