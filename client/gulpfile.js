const gulp =  require("gulp");
const babel =  require("gulp-babel");
const autoprefixer =  require("gulp-autoprefixer");
const sourcemaps =  require("gulp-sourcemaps");

const dirs = {
	src : "./media/js",
	dest : "./media/js-src"
}

const es6Path = {
	src : `${dirs.src}/`+`*.js`,
	dest : `${dirs.dest}`
}

gulp.task('babel', ()=>{
	return gulp.src(es6Path.src)
				.pipe(babel())
				.pipe(gulp.dest(es6Path.dest));
});

gulp.task('watch',()=>{
	gulp.watch(es6Path.src, ['babel']);
})