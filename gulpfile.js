const gulp = require("gulp");
const less = require("gulp-less");
const { wasm } = require("webpack");
const webpack = require("webpack-stream");
const webpackSettings = {
	mode: 'development',
	entry: {
		script: './app/src/js/script.js',
		danter: './app/src/js/danter.js',
		main: './app/src/js/main.js',
		error: './app/src/js/error.js',
		search: './app/src/js/search.js',
	},
	output: {
		filename: '[name].js',
	},
	watch: false,
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', {
								debug: true,
								corejs: 3,
								useBuiltIns: 'usage'
							}],
							'@babel/react'
						]
					}
				}
			}
		]
	}
};

const dist = "C:/xampp/htdocs/test";
const sass = require("gulp-sass")(require('sass'));

gulp.task('less', function () {
	return gulp.pipe(less());
})

gulp.task("copy-html", () => {
	return gulp.src("./app/src/*.html")
		.pipe(gulp.dest(dist));
});

gulp.task("copy-json", () => {
	return gulp.src("./app/json/**.json")
		.pipe(gulp.dest(dist + '/json'));
});

gulp.task('vendor', function () {
	return gulp.src('./vendor/**/*.*')
		.pipe(gulp.dest(dist + "/vendor/"));
})



//BEGIN JS FILE
gulp.task("build-js", () => {
	return gulp.src("./app/src/**/**.js")
		.pipe(webpack(webpackSettings))
		.pipe(gulp.dest(dist + "/script"));
});


//END

gulp.task("build-sass", () => {
	return gulp.src("./app/scss/**/*.scss")
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(dist + "/css"));
});

gulp.task("copy-api", () => {
	return gulp.src("./app/api/**/*.*")
		.pipe(gulp.dest(dist + "/api"));
});

gulp.task("copy-assets", () => {
	return gulp.src("./app/assets/**/*.*")
		.pipe(gulp.dest(dist + "/assets"));
});




gulp.task("watch", () => {
	gulp.watch("./app/src/*.html", gulp.parallel("copy-html"))
	gulp.watch("./app/src/**/*.js", gulp.parallel("build-js"))
	gulp.watch("./app/scss/**/*.scss", gulp.parallel("build-sass"))
	gulp.watch("./app/api/**/*.php", gulp.parallel("copy-api"))
	gulp.watch("./app/assets/**/*.*", gulp.parallel("copy-assets"))
	gulp.watch("./app/json/**/*.json", gulp.parallel("copy-json"))
	gulp.watch("./vendor/**/*.*", gulp.parallel("vendor"))
});

gulp.task("build", gulp.parallel("copy-html", "build-js", "build-sass", "copy-api", "copy-assets", "copy-json", "settings-composer"));

gulp.task("default", gulp.parallel("watch", "build"));