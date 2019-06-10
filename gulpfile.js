var gulp = require('gulp'),
    plumber = require('gulp-plumber');
less = require('gulp-less'),
    prefixer = require('gulp-autoprefixer'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    svgstore = require("gulp-svgstore"),
    browserSync = require("browser-sync"),
    embedSvg = require('gulp-embed-svg'),
    webp = require("gulp-webp"),
    del = require('del'),
    rigger = require('gulp-rigger'),
    reload = browserSync.reload;

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/script.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'src/less/style.less',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        svg: 'src/img/**/icon-*.svg',
        fonts: 'src/fonts/**/*.*',
        imgfolder: 'src/img/'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/less/**/*.less',
        img: 'src/img/**/*.*',
        svg: 'src/img/**/icon-*.svg',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};



var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};






gulp.task('html:build', function (done) {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(plumber())
        .pipe(rigger())
        .pipe(embedSvg({
            selectors: '.sprite-svg', // only replace tags with the class inline-svg
            root: 'src/img'
        }))
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
    done();
});




gulp.task('js:build', function (done) {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(plumber())
        .pipe(uglify()) //Сожмем наш js
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
    done();
});


gulp.task('style:build', function (done) {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(plumber())
        .pipe(less()) //Скомпилируем
        .pipe(prefixer({
            browsers: ['> 1%, Last 2 versions, iOS 11'],
            cascade: false
        })) //Добавим вендорные префиксы
        .pipe(cssmin()) //Сожмем
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}));
    done();
});



gulp.task('image:build', function (done) {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(plumber())
        .pipe(imagemin([
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
    done();
});

gulp.task('svg:store', function(done){
    gulp.src(path.src.svg)
        .pipe(plumber())
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest(path.src.imgfolder))
        .pipe(reload({stream: true}));
    done();
});


gulp.task("image:webp", function(done) {
    return gulp.src("src/img/**/*.{png,jpg}")
        .pipe(plumber())
        .pipe(webp({quality: 90})) /* Конвертируем png/jpg в webp с легкой потерей качества изображения */
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
    done();
});



gulp.task('fonts:build', function(done) {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
    done();
});


gulp.task("clean", function(done) {
    return del("build");
    done();
});

gulp.task('webserver', function (done) {
    browserSync(config);
    done();
});


gulp.task('build', gulp.series(
    'svg:store',
    'clean',
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'image:webp',
    'webserver'
    ), function(done) {
        done();
    }
);


gulp.task('watch', function(done){
    gulp.watch(path.watch.html, gulp.series('html:build'));
    gulp.watch(path.watch.style, gulp.series('style:build'));
    gulp.watch(path.watch.js, gulp.series('js:build'));
    gulp.watch(path.watch.img, gulp.series('image:build'));
    gulp.watch(path.watch.svg, gulp.series('svg:store'));
    gulp.watch(path.watch.img, gulp.series('image:webp'));
    gulp.watch(path.watch.fonts, gulp.series('fonts:build'));
    done();
});






gulp.task('default', gulp.series('build', 'webserver', 'watch'), function(done){
    done();
});