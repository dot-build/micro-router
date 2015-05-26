/**
 * @class Pattern
 * @example
 * 		var pattern = new Pattern('foobar');
 * 		pattern.match('foobar') // => true
 * 		pattern.match('bar') // => false
 */
class Pattern {
	constructor(pattern) {
		this.create(pattern);
	}

	match(value) {
		return this.matcher.test(value);
	}

	create(pattern) {
		var matcher;

		if (typeof pattern === 'string') {
			matcher = {};
			matcher.value = pattern;
			matcher.test = function (value) {
				return value === this.value;
			};
		}

		else if (pattern instanceof RegExp) {
			matcher = pattern;
		}

		else if (typeof pattern === 'function') {
			matcher = {};
			matcher.test = pattern;
		}

		else {
			throw new Error('Invalid pattern: ' + pattern);
		}

		this.matcher = matcher;
	}
}

export { Pattern };