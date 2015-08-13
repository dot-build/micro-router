(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['exports', './Pattern'], factory);
	} else if (typeof exports !== 'undefined') {
		factory(exports, require('./Pattern'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.Pattern);
		global.Router = mod.exports;
	}
})(this, function (exports, _Pattern) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	/**
  * @class Router
  * @example
  * 		var router = new Router();
  * 		router.when('patt3rn', patternHandler);
  * 		router.when(/^foo|bar$/, foobarHandler);
  * 		router.when(matcherFn, otherHandler);
  *
  * 		router.match('foo');		//	=> foobarHandler('foo')
  * 		router.match('bar');		//	=> foobarHandler('bar')
  * 		router.match('patt3rn');	//	=> patternHandler('patt3rn')
  * 		router.match('whatever');	//	=> matcherFn('whatever') ? otherHandler('whatever')
  */

	var Router = (function () {
		function Router() {
			_classCallCheck(this, Router);

			this.patterns = [];
		}

		_createClass(Router, [{
			key: 'match',
			value: function match(value) {
				var matched = this.patterns.some(function (o) {
					if (o.pattern.match(value)) {
						o.handler(value);
						return true;
					}
				});

				if (!matched) {
					throw new Error('Not found: ' + value);
				}
			}
		}, {
			key: 'when',
			value: function when(pattern, handler) {
				this.push(new _Pattern.Pattern(pattern), handler);
				return this;
			}
		}, {
			key: 'push',
			value: function push(pattern, handler) {
				this.patterns.push({
					pattern: pattern,
					handler: handler
				});
			}
		}]);

		return Router;
	})();

	exports.Router = Router;
});