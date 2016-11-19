const gulp = require('gulp')
const argv = require('yargs').argv
const del = require('del')
const config = require('./config')
const features = require('./features.js')

const plugins = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[-.]/,
})

const src = './src'
const dest = './dist'

const data = {
  config,
  features,
}

const paths = {
  fonts: {
    src: `${src}/assets/fonts/**/*`,
    dest: `${dest}/assets/fonts`,
  },
  styles: {
    src: `${src}/assets/sass/**/*.scss`,
    dest: `${dest}/assets/css`,
  },
  scripts: {
    src: `${src}/assets/js/**/*.js`,
    dest: `${dest}/assets/js`,
  },
  images: {
    src: `${src}/assets/images/**/*`,
    dest: `${dest}/assets/images`,
  },
  pages: {
    src: `${src}/pages/**/*.+(html|njk)`,
    dest: `${dest}`,
  },
  templates: {
    src: `${src}/templates/**/*.+(html|njk)`,
  },
}

// Error Handler
let failOnError = true
const handleError = (error) => {
  console.log(error.toString())
  if (failOnError) {
    console.error('Aborting build')
    process.exit(1)
  }
  this.emit('end')
}

// On Chane
const onChange = (event) => {
  console.log(`File ${event.path} has been ${event.type}`)
}

// Path Cleaner
const cleanPath = (path) => {
  const deletePath = del.sync([path])
  return deletePath
}

// Task Handlers
const scriptsTask = () => {
  const defaultUglifyOptions = { compress: { evaluate: false } }
  cleanPath(`${paths.scripts.dest}/*`)

  gulp.src(paths.scripts.src)
    .pipe(plugins.babel({ presets: ['es2015'] }))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('scripts.js'))
    .pipe(argv.prod ? plugins.uglify(defaultUglifyOptions) : plugins.util.noop())
    .on('error', handleError)
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(paths.scripts.dest))
}

const stylesTask = () => {
  const defaultNanoOptions = { safe: true }
  cleanPath(`${paths.styles.dest}/*`)

  gulp.src(paths.styles.src)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    .on('error', handleError)
    .pipe(plugins.concat('styles.css'))
    .pipe(argv.prod ? plugins.cssnano(defaultNanoOptions) : plugins.util.noop())
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest))
}

const fontsTask = () => {
  cleanPath(`${paths.fonts.dest}/*`)

  gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest))
}

const pagesTask = () => {
  plugins.nunjucksRender.nunjucks.configure([src])

  gulp.src(paths.pages.src)
    .pipe(plugins.data(data))
    .pipe(plugins.nunjucksRender({ path: [src], watch: false }))
    .pipe(gulp.dest(paths.pages.dest))
}

const imagesTask = () => {
  cleanPath(`${paths.images.dest}/*`)

  gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest))
}

const watchTask = () => {
  failOnError = false
  const watchFiles = [
    { files: [paths.fonts.src], tasks: ['fonts'] },
    { files: [paths.styles.src], tasks: ['styles'] },
    { files: [paths.scripts.src], tasks: ['scripts'] },
    { files: [paths.images.src], tasks: ['images'] },
    { files: [paths.pages.src, paths.templates.src], tasks: ['pages'] },
  ]

  for (let i = 0; i < watchFiles.length; i++) {
    gulp.watch(watchFiles[i].files, watchFiles[i].tasks)
      .on('error', handleError)
      .on('change', onChange)
  }
}

// Tasks
gulp.task('fonts', fontsTask)
gulp.task('styles', stylesTask)
gulp.task('scripts', scriptsTask)
gulp.task('images', imagesTask)
gulp.task('pages', pagesTask)
gulp.task('watch', watchTask)
gulp.task('default', ['scripts', 'styles', 'fonts', 'pages', 'images'])
