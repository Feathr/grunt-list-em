# grunt-list-em

> Grunt plugin that takes an array of files and writes them to a declared file (i.e. js files to index.html)

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-list-em --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-list-em');
```

## The "list_em" task

### Overview
In your project's Gruntfile, add a section named `list_em` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  list_em: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.template
Type: `Object`

The templates for sourcing files. Definition of single template overrides its default
equivalent only.

Example:

```javascript
list_em: {
  template: {
    html: {
      js: '<script type="text/javascript" src="{filePath}"></script>'
    }
  }
}
```

### Usage Examples

#### Files
Send in an array of file objects that contain an id, the destination file, and the array that contains the list of files you want written.

```js
grunt.initConfig({
  list_em: {
    options: {},
    dev: {
      files: [{
        id: 'js_libraries',
        dest: 'index.html',
        src: arrayOfJsLibraries
      },{
        id: 'app_source',
        dest: 'index.html',
        src: arrayOfSourceCode
      }]
    }
  },
});
```

#### How to include
To declare where in the file you would like your source files to be listed:

```html
<!-- list_em: js_libraries -->
<!-- list_em: app_source -->
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## TODO
 - Add testing component
 - Support for CSS

