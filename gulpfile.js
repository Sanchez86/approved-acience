var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync  = require('browser-sync'),
	cache        = require('gulp-cache'),
	del          = require('del'),
	imagemin     = require('gulp-imagemin'),
	pngquant     = require('imagemin-pngquant'),
	autoprefixer = require('gulp-autoprefixer');
	concat = require('gulp-concat');

gulp.task('sass', function(){
	return gulp.src('app/sass/main.scss')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
	.pipe(gulp.dest('./app/stylesheets'))
	.pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function() {
  return gulp.src([
  'app/js/jquery.min.js', 
  'app/js/bootstrap.min.js',
  'app/js/script.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./app/js/'));
});

gulp.task('browser-sync', function(){
	browserSync({
		server:{
			baseDir:'app'
		},
		notify:false
	})
});
gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function(){
	gulp.watch('app/sass/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/*.js', browserSync.reload);
});
gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});
gulp.task('img', function() {
	return gulp.src('app/images/**/*') // Берем все изображения из app
		.pipe(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('dist/images')); // Выгружаем на продакшен
});

gulp.task('build', ['clean', 'img', 'sass'], function() {

	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
		'app/stylesheets/main.css'
		])
	.pipe(gulp.dest('dist/stylesheets'))

	var buildJs = gulp.src('app/js/*.js') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));
	
	var buildFonts = gulp.src('app/fonts/*') 
	.pipe(gulp.dest('dist/fonts'));

});
