/* DEV PLUGINS------------------------------------------------------------------
 ---------------------------------------------------------------------------- */
'use strict';
const gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    twig = require('gulp-twig'),
    babel = require('gulp-babel'),
    sass = require("gulp-sass"),
    prefix = require("gulp-autoprefixer"),
    gcmq = require('gulp-group-css-media-queries'),
    uglify = require('gulp-uglify'),
    sourcemaps = require("gulp-sourcemaps"),
    callback = require('gulp-callback'),
    clean = require('gulp-clean'),
    spritesmith = require("gulp.spritesmith"),
    browserSync = require('browser-sync'),
    purify = require('gulp-purifycss'),
    cssnano =  require('gulp-cssnano'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    path = require('path'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace');

/* PRODUCTION PLUGINS ----------------------------------------------------------
 ---------------------------------------------------------------------------- */
const useref = require('gulp-useref'),
    wiredep = require('wiredep').stream,
    gulpif = require('gulp-if');

/* SOURCES --------------------------------------------------------------------
 ---------------------------------------------------------------------------- */
const sources = {
    html: {
        src: 'app/*.html',
        dist: 'app/'
    },
    css: {
        src: 'app/css/*.css',
        dist: 'app/css'
    },
    js: {
        dist: 'app/js',
        watch: 'app/js/*.js',
        es6_watch: 'app/js/es6/*.js'
    },
    twig: {
        src: 'app/twig/*.twig',
        watch: 'app/twig/**/*.twig',
        temp_dist: 'app/.twig-temp/',
        temp_dist_html: 'app/.twig-temp/*.html',
        dist: 'app/'
    },
    sass: {
        src: 'app/sass/*.sass',
        watch: 'app/sass/**/*.sass',
        dist: 'app/sass'
    },
    bower: {src: 'app/bower_components'},
    images: {
        icons: {
            default: 'app/images/icons/*.png',
            retina: 'app/images/icons/*@2x.png'
        },
        dist: 'app/images'
    }
};

/* DEVELOPMENT GULP TASKS ------------------------------------------------------

 ---------------------------------------------------------------------------- */
gulp.task('svgstore', function () {
    return gulp
        .src('app/images/svg-icons/*.svg')
        .pipe(cheerio({
            run: function ($) {
                if ($('[fill]').attr('fill') !== "none") {
                    $('[fill]').css({ fill: "currentColor" });
                }
                if ($('[stroke]').attr('stroke') !== "none") {
                    $('[stroke]').css({ stroke: "currentColor" });
                }
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            };
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('app/images/'));
});
/* Error Handler ---------------------------------------------------------------
 ---------------------------------------------------------------------------- */

const onError = function (err) {
    console.log(err);
    this.emit('end');
};

/* TWIG --------------------------------------------------------------------- */
gulp.task('twig', function () {
    gulp.src(sources.twig.src)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(twig({
            data: {
                benefits: [
                    'Fast',
                    'Flexible',
                    'Secure'
                ]
            }
        }))
        .pipe(gulp.dest(sources.twig.dist))
        .pipe(browserSync.reload({stream: true}));

    return null;
});

gulp.task('twigExt', function () {
    gulp.src("app/components/**/*.twig")
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(twig({
            data: {
                benefits: [
                    'Fast',
                    'Flexible',
                    'Secure'
                ]
            }
        }))
        .pipe(gulp.dest(sources.twig.dist))
        .pipe(browserSync.reload({stream: true}));

    return null;
});

/* SASS --------------------------------------------------------------------- */
gulp.task('sass', function () {
    return gulp.src(sources.sass.src)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(prefix({
            browsers: ['>0%'],
            cascade: false
        }))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(sources.css.dist))
});

gulp.task('sassExt', function () {
    return gulp.src("app/components/**/*.sass")
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(prefix({
            browsers: ['>0%'],
            cascade: false
        }))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(sources.css.dist))
});

/* Combine media queries ----------------------------------------------------- */
gulp.task('gcmq', ['sass'], function () {
    gulp.src(sources.css.src)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(gcmq())
        .pipe(gulp.dest(sources.css.dist))
        .pipe(browserSync.reload({stream: true}));
});

/* CSSNANO --------------------------------------------------------------------- */
gulp.task('cssnano', function() {
    return gulp.src('dist/css/common.css')
        .pipe(cssnano({
            reduceIdents: false
        }))
        .pipe(gulp.dest('dist/css/'));
});

/* ES6 to ES5 ---------------------------------------------------------------- */
gulp.task('es6', () =>
    gulp.src("app/js/app.js")
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('app/js/es5'))
);

/* BOWER --------------------------------------------------------------------- */
gulp.task('bower', function () {
    gulp.src(sources.html.src)
        .pipe(wiredep({
            directory: sources.bower.src
        }))
        .pipe(gulp.dest('app'));
});

/* BROWSER SYNC -------------------------------------------------------------- */
gulp.task('browser-sync', function () {
    browserSync.init({
        server: "./app"
    });
});

/* PRODUCTION GULP TASKS ------------------------------------------------------
 ---------------------------------------------------------------------------- */

/* SFTP --------------------------------------------------------------------- */
gulp.task('sftp', function () {
    gulp.src("dist/**/*")
        .pipe(sftp({
            host: "",
            user: "",
            pass: "",
            remotePath: ""
        }));
});

/* CLEAN CSS ----------------------------------------------------------------- */
gulp.task('clean_css', function () {

});

/* CLEAN -------------------------------------------------------------------- */
gulp.task('clean', function () {
    gulp.src('dist', {read: false})
        .pipe(clean());
    gulp.src('dist-src', {read: false})
        .pipe(clean());
    gulp.src('dist-min', {read: false})
        .pipe(clean());
});

/* BUILD -------------------------------------------------------------------- */
gulp.task('build', ["clean"], function () {
    setTimeout(function () {
        gulp.start('build_dist');
        gulp.start('images');
        gulp.start('fonts');
    }, 1000);
});

gulp.task('build_dist', function () {
    gulp.start('fonts');
    gulp.src(sources.html.src)
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function () {
    gulp.src([
        'app/bower_components/uikit/fonts/**',
        'app/fonts/**'
    ])
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', function () {
    gulp.src([
        'app/images/**',
        '!app/images/icons',
        '!app/images/icons-2x',
        '!app/images/icons/**',
        '!app/images/icons-2x/**'
    ])
        .pipe(gulp.dest('dist/images'));
    gulp.src([
        'app/images/**',
        '!app/images/icons',
        '!app/images/icons-2x',
        '!app/images/icons/**',
        '!app/images/icons-2x/**'
    ])
        .pipe(gulp.dest('dist-src/images'));
    gulp.src([
        'app/images/**',
        '!app/images/icons',
        '!app/images/icons-2x',
        '!app/images/icons/**',
        '!app/images/icons-2x/**'
    ])
        .pipe(gulp.dest('dist-min/images'));
});


/* DEFAULT AND GULP WATCHER ----------------------------------------------------
 ---------------------------------------------------------------------------- */
gulp.task('watch', function () {
    gulp.watch('bower.json', ["bower"]);
    gulp.watch("app/sass/**/*.sass", ['gcmq']);
    gulp.watch("app/components/**/*.sass", ['gcmq']);
    gulp.watch("app/js/app.js", ['es6']);
    gulp.watch(sources.twig.watch, ["twig"]);
    gulp.watch("app/components/**/*.twig", ["twig"]);
    gulp.watch(sources.js.es6_watch, ['es6']);
    gulp.watch(sources.js.watch).on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'es6', 'twig', 'gcmq', 'watch']);
