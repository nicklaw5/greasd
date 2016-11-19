# greasd
A static HTML site generator greasing the wheels of your next project.

### Features
- Sass for CSS compiling
- Supports asset minification
- Uses [Nunjucks](https://mozilla.github.io/nunjucks/) for templating
- Build on the go with [gulp-watch](https://github.com/floatdrop/gulp-watch)
- Supports ES2015 and ES6 Transpilling
- Comes with [Bootstrap 4](https://v4-alpha.getbootstrap.com/) out of the box

### Setup
``` bash
$ git clone git@github.com:nicklaw5/greasd.git
$ cd greasd
$ yarn install
$ gulp
```
All files and assets are generated to the `dist` folder in the project root.

### Other Commands
``` bash
# ESLint
$ yarn run lint-js

# Sass-Lint
$ yarn run lint-sass

# Gulp Watch
$ gulp watch
```

### License
Distributed under the [MIT](https://github.com/nicklaw5/greasd/blob/master/LICENSE) license.
