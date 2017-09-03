<h2>iFit Demo Project</h2>

This is a PSD->HTML/JS/CSS conversion for the iFit.
Being that the requirements are open ended, this project is using ES6 Javascript, Pug for HTML templating, and regular HTML5/CSS3 for styling.

NPM has been integrated to facilitate gathering packages and Gulp is used to automate the build process for a production deployment.
Mocha is included to test some of the Javascript, but no unit tests were written.

The following extra assets were used:
jQuery
Bootstrap-SASS
Bootstrap-Select
Jasny Bootstrap
Font Awesome
Animate.css
Hover.css

For deployment, /build should be used. If you would like to rebuild the project please run npm install and then 'gulp' to begin the default task.

There are two ways to use this package:<br />
<h4>Method 1 (Retains /build)</h4>

```
npm install
```

<h4>Method 2 (Use Gulp to generate a new /build, downloads any depedencies)</h4>

```
npm start
```

For development Live Reload is implemented by the gulp task 'gulp webserver', however, if you run the 'gulp watch' or 'gulp watch:babel' tasks your source directories will be watched accordingly, as well.<br />
If you add a new directory, a new watch task will need to be generated. SASS/PUG/JS/IMG folders are watched currently.<br />
<br/>
To use Mocha the following NPM command be be issued:
```
npm test
````

<br/>
<br/>
If you'd like to use another grid system or CSS framework feel free to just run and update your layouts accordingly:
```
npm uninstall bootstrap-sass
npm uninstall font-awesome
npm uninstall jquery
```
Note, you will have to modify gulpfile.babel.js to remove references to these libraries because they are copied over by default (bootstrap-sass & font-awesome, etc.). <br/>
source/sass/vendor.scss also contains references to these files due to imports as well as source/index.html or source/pug/_includes/head.pug and source/pug/_includes/foot.pug.<br/>

Gulp Commands:
```
gulp - builds everything from node_modules and source, deletes /build folder if it existed
gulp build - builds everything from node_modules and source without clearing the build folder
gulp watch - watch source directories for changes, if detected deploy to build. Doesn't watch JS changes.
gulp watch:babel - watch source diretories for changes, if detected deploy to build. Does watch JS directories.
gulp webserver - starts live reload monitoring & watching source directories for building (by default uses watch:babel)
```

Prerequisites:<br/>
[Node/NPM](https://nodejs.org/en/)<br />
<br/>
