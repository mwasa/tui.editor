var istanbul = require('browserify-istanbul');

module.exports = function(config) {
    'use strict';

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['source-map-support', 'browserify', 'jasmine-ajax', 'jasmine-jquery', 'jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'lib/jquery/dist/jquery.js',
            'lib/codesnippet/code-snippet.js',
            'lib/marked/marked.min.js',
            'lib/codemirror/lib/codemirror.js',
            'lib/codemirror/addon/mode/overlay.js',
            'lib/codemirror/mode/markdown/markdown.js',
            'lib/codemirror/mode/gfm/gfm.js',
            'src/js/**/*.js',
            //{pattern: 'test/fixtures/*', included: false},
            'test/**/*.spec.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/js/**/*.js': ['browserify'],
            'test/**/*.spec.js': ['browserify']
        },

        browserify: {
            debug: true,
            bundleDelay: 1000,
            transform: [istanbul({
                ignore: ['**/test/**', '**/tmpl/**'],
                defaultIgnore: true
            })]
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [
            'coverage'
        ],

        // optionally, configure the reporter
        coverageReporter: {
            dir: 'report/coverage/',
            reporters: [
                {type: 'text'},
                {
                    type: 'html',
                    subdir: function(browser) {
                        return 'report-html/' + browser;
                    }
                }
            ]
        },


        // web server port
        port: 9877,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        autoWatchBatchDelay: 100,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            'PhantomJS'
            //'Firefox'
            //'Chrome'
        ],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};