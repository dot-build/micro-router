var fs = require('fs');
var start = '(function () {var global = this, exports = {};';
var end = 'global.Router = exports.Router})()';

var parts = [
	start,
	fs.readFileSync('main.js', 'utf8'),
	end
];

fs.writeFileSync('browser.js', parts.join('\n'));
