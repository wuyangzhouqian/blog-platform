const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');
const gulpSequence = require('gulp-sequence');//执行队列
const eslint = require('gulp-eslint');

//开发环境
gulp.task('dev', () => {
    return watch('./src/nodeserver/**/*.js', { ignoreInitial: false }, () => {
        gulp.src('./src/nodeserver/**/*.js')
            .pipe(babel({
                babelrc: false, // 关闭外侧的babelrc
                plugins: ['transform-es2015-modules-commonjs','transform-decorators-legacy']
            }))
            .pipe(gulp.dest('dist'));
    });
});

//生产环境
gulp.task('prod', () => {
    gulp.src('./src/nodeserver/**/*.js')
        .pipe(babel({
            babelrc: false, // 关闭外侧的babelrc
            ignore: ['./src/nodeserver/config/*.js'],
            plugins: ['transform-es2015-modules-commonjs']
        }))
        .pipe(gulp.dest('dist'));
});

//清洗node代码
gulp.task('configClean', () => {
    gulp.src('./src/nodeserver/**/*.js')
        // transform the files here.
        .pipe(rollup({
            // any option supported by Rollup can be set here.
            output: {
                format: 'cjs' // 这个format 是因为babel 是安装 commonjs的编译
            },
            input: './src/nodeserver/config/index.js',
            plugins: [
                replace({
                    'process.env.NODE_ENV': JSON.stringify('production')
                })
            ]
        }))
        .pipe(gulp.dest('./dist'));
});

//lint
gulp.task('lint', () => {
    return gulp.src(['./src/nodeserver/**/*.js'])
        // eslint() attaches the lint output to the 'eslint' property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

// 开启文件检测
let _task = ['dev'];

if (process.env.NODE_ENV === 'production') {
    _task = gulpSequence('lint','prod', 'configClean');
}

if (process.env.NODE_ENV === 'lint') {
    _task = ['lint'];
}

gulp.task('default', _task);