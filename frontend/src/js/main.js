// Load bootstrap with jquery for browserify/uglify build step
const $ = require('jquery');
window.$ = window.jQuery = $;
require('./bootstrap.js');
$.noConflict(true);

module.exports = {
	test: function (i) {
		return i + 1;
	}
};