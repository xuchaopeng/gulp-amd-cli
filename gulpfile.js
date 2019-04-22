var gulp = require("gulp"),
  amdOptimize = require("amd-optimize"), concat = require('gulp-concat'), rev = require('gulp-rev-append-fake'), htmlmin = require('gulp-htmlmin'), clean = require('gulp-clean'),sass = require("gulp-sass"),cleanCSS = require('gulp-clean-css'),autoprefixer = require('gulp-autoprefixer'),rename = require('gulp-rename'),uglify = require('gulp-uglify'),browserSync = require('browser-sync'),babel = require('gulp-babel');
var options = {
  removeComments: true, //清除HTML注释
  collapseWhitespace: true, //压缩HTML
  collapseInlineTagWhitespace: true, //不在显示之间留下任何空格
  collapseBooleanAttributes: false, //省略布尔属性的值 <input checked="true"/> ==> <input />
  decodeEntities: false, //尽可能使用直接Unicode字符
  removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
  removeScriptTypeAttributes: false, //删除<script>的type="text/js"
  removeStyleLinkTypeAttributes: false, //删除<style>和<link>的type="text/css"
  minifyJS: true, //压缩页面JS
  minifyCSS: true, //压缩页面CSS
  keepClosingSlash: true, //在单例元素上保留尾部斜杠
  useShortDoctype: true, //用短（HTML5）doctype替换doctype
  processScripts: ['text/x-dot-template'], // 要压缩的模板 type
  ignoreCustomFragments: [/<%[\s\S]*?%>/, /<\?[\s\S]*?\?>/, /\${.*?}|{@.*?}/] // [ /<%[\s\S]*?%>/, /<\?[\s\S]*?\?>/ ]
};
var commonJsArr = ['require.js','jquery.js','config.js','cookie.js'];
var commonCssArr = ['common.scss'];
var srcPath = 'src/static';
var distPath = 'dist/static';
var min = '.min';

gulp.task('clean', function () {
  return gulp.src(['dist'])
    .pipe(clean({ force: true }));
});

//压缩对应的HTML
gulp.task('html', function () {
  return gulp.src([
    'src/index.html'
  ])
    .pipe(rev({
      mode: 'loose',
      outputPath: './dist',
      rootDir: './dist'
    }))
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist'))
});

//子窗口文件
gulp.task('iframe', function () {
  return gulp.src([
    srcPath + '/iframe/*.html'
  ])
    .pipe(htmlmin(options))
    .pipe(gulp.dest(distPath + '/iframe'))
});

//swf复制
gulp.task('swf', function () {
  return gulp.src(srcPath + '/js/common/*.swf')
    .pipe(gulp.dest(distPath + '/js/common'))
});

//字体复制
gulp.task('font', function () {
  return gulp.src(srcPath + '/font/**')
    .pipe(gulp.dest(distPath + '/font'))

});

//图片复制
gulp.task('image', function () {
  return gulp.src(srcPath + '/image/**/*')
    .pipe(gulp.dest(distPath + '/image'))

});

//插件复制
gulp.task('plugin', function (cb) {
  gulp.src(srcPath + '/js/plugin/*.js')
    .pipe(gulp.dest(distPath + '/js/plugin'))
  cb();
});

//页面scss的处理
gulp.task('pageCss', function (cb) {
  gulp.src(srcPath + '/css/page/*.scss')
      .pipe(sass())
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(autoprefixer({
          browsers: ['last 4 versions'],
          cascade: false,
          remove: true
      }))
      .pipe(rename(function (path) {
          path.basename = path.basename + min;
      }))
      .pipe(gulp.dest(distPath + '/css/page'))

  cb();
});

//公共样式处理
gulp.task('commonCss', function (cb) {
  gulp.src(srcPath + '/css/common/*.scss')
      .pipe(sass())
      // .pipe(minifycss())
      .pipe(concat('base.css'))
      .pipe(autoprefixer({
          browsers: ['last 4 versions'],
          cascade: false,
          remove: true
      }))
      .pipe(rename(function (path) {
          path.basename = path.basename + min;
      }))
      .pipe(gulp.dest(distPath + '/css/common'))

  cb();
});

//公共js处理
gulp.task('commonJs', function (cb) {
  var arr = [];
  for (var i = 0; i < commonJsArr.length; i++) {
    arr.push(srcPath + '/js/common/' + commonJsArr[i]);
  }
  gulp.src(arr)
    .pipe(concat('base.js'))
    // .pipe(uglify())
    .pipe(rename(function (path) {
      path.basename = path.basename + min;
    }))
    .pipe(gulp.dest(distPath + '/js/common'))

  cb();
});
//页面js处理  每个页面对应一个文件
gulp.task('pageJs', function (cb) {
  gulp.src([srcPath + '/js/page/*.js'])
    .pipe(babel())
    .pipe(uglify({
      sourcemap: true,
      ie8: true
    }))
    .pipe(rename(function (path) {
      path.basename = path.basename + min;
    }))
    .pipe(gulp.dest(distPath + '/js/page'))

  cb();
});

gulp.task("amd", function () {
  return gulp.src(srcPath + "/js/page/*.js")
    .pipe(amdOptimize('index'))    //主入口文件
    .pipe(concat("index.min.js"))      //合并后的文件，如何合并后的文件和主入口名一样，构建后便只有一个文件
    .pipe(gulp.dest(distPath + '/js/page'));  //输出目录
});

gulp.task('default', function () {
  gulp.start(['html', 'iframe', 'swf', 'font', 'image', 'plugin','pageCss','commonCss','commonJs','pageJs'], function () {
    console.log('编译打包完成');
  });
});

//开发环境
gulp.task('development', function () {
  function scssSolve(pathname) {
    var sass = require('node-sass');
    var str = '';
    if (pathname.match(/css\/common\/base/)) {
      var files = commonCssArr;
      for (var i = 0; i < files.length; i++) {
        str += sass.renderSync({
          file: srcPath+'/css/common/' + files[i]
        }).css.toString();
      }
      return str;
    } else if (pathname.match(/css\/page/)) {
      var path = 'src' + pathname.replace(/\.min/, '').replace(/\.css/, '.scss');
      str = sass.renderSync({
        file: path
      }).css.toString();
      return str;
    } else {
      console.log('不符合预期');
    }
  }
  function jsSolve(pathname) {
    var str = '';
    if (pathname.match(/js\/common/)) {
      var files = commonJsArr;
      for (var i = 0; i < files.length; i++) {
        var path = srcPath+'/js/common/' + files[i];
        str += require('fs').readFileSync(path).toString();
      }
      return str;
    } else if (pathname.match(/js\/page/)) {
      var path = 'src' + pathname.replace(/\.min/, '');
      console.log(pathname)
      str = require('fs').readFileSync(path).toString();
      return str;
    } else {
      console.log('不需要处理的文件，直接返回');
    }

  }
  browserSync.init({
    // https: true,
    server: {
      baseDir: './src'
    },
    middleware: function (req, res, next) {
      var pathname = require("url").parse(req.url).pathname;
      if (pathname.match(/\.css/)) {
        var str = scssSolve(pathname);
        if (str) {
          res.end(str);
        }
      }
      if (pathname.match(/\.js/)) {
        var str = jsSolve(pathname);
        if (str) {
          res.end(str);
        }
      }
      next();
    }
  });
  gulp.watch('src/*.html').on('change', function () {
    browserSync.reload('*.html');
  });
  gulp.watch(srcPath + '/css/**/*.scss').on('change', function () {
    browserSync.reload('*.css');
  });
  gulp.watch(srcPath + '/js/**/*.js').on('change', function () {
    browserSync.reload('*.js');
  });
  browserSync.reload();
});
