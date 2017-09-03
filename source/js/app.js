//jQuery
let jquery = require('jquery');
global.$ = global.jQuery = jquery;
//Bootstrap and other plugins that require jQuery and/or extend base jQuery functionality
require('bootstrap-sass');
require('jquery-parallax.js'); 
require('bootstrap-select');
//Issue with the NPM Package, does not import correctly with just module name
require('jasny-bootstrap/dist/js/jasny-bootstrap');
//Javascript Plugins
require('scrollreveal');
//Helper Functions
import { footer } from './footer';
//import { header } from '/header';


jQuery(document).ready(function () {
	//Anything that needs to initialize itself after the DOM is ready.
	footer();
});
