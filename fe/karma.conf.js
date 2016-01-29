require('@kalon/mylocal-config');
var _ = require('lodash');
var webpack = require('webpack');
var Rewire = require('rewire-webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var coverage;
var html;
var cobertura;
var reporters;
coverage = {
  type: 'html',
  dir: 'coverage/',
};
html = {
  outputDir: 'tests/results',
  templatePath: 'tests/utils/jasmine_template.html',
};
cobertura = {
  type: 'cobertura',
  subdir: '.',
  file: 'cobertura.xml',
};

reporters = ['progress', 'html', 'coverage'];

var env = process.env.NODE_ENV || 'development';

module.exports = function(config) {
  config.set({
    //browsers: ['Chrome'],
    browsers: ['PhantomJS'],
    browserNoActivityTimeout: 30000,
    frameworks: ['jasmine'],
    files: [
      'tests.webpack.js',
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap'],
    },
    reporters: reporters,
    coverageReporter: {reporters: [coverage, cobertura]},
    htmlReporter: html,
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [

          // TODO: fix sourcemaps
          // see: https://github.com/deepsweet/isparta-loader/issues/1
          {
            test: /\.js$|.jsx$/,
            loader: 'babel',
            exclude: /node_modules|bower_components/,
          },
          {
            test: /\.js$|.jsx$/,
            loader: 'isparta?{babel: {stage: 0}}',
            exclude: /node_modules|bower_components|test/,
          },
          {
            test: /\.scss/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader?browsers=last 2 version!sass-loader'),
          },
          {
            test: /\.(jpe?g|png|gif|svg|woff|eot|ttf)$/,
            loader: 'file?name=[sha512:hash:base64:7].[ext]',
          },
          {
            test: /\.json$/, loader: 'json',
          },
        ],
      },
      plugins: [
        new Rewire(),
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(process.env.NODE_ENV === 'development' || true),
          __PROD__: JSON.stringify(process.env.NODE_ENV === 'production' || false),
          CONFIG: JSON.stringify(_.pick(process.env, 'API_URL')),
        }),
        new ExtractTextPlugin('style.css'),
      ],
      resolve: {
        extensions: ['', '.js', '.json', '.jsx'],
        modulesDirectories: ['', 'bower_components', 'node_modules', 'src'],
        alias:{
          'jasmine-immutablejs-matchers': path.join(__dirname, 'node_modules/jasmine-immutablejs-matchers'),
        },
      },
    },
    webpackServer: {
      noInfo: true,
    },
    exclude: [],
    logLevel: config.LOG_INFO,
    colors: true,
    port: 4001,
    singleRun: false,
    autoWatch: true,
    captureTimeout: 60000,
  });
};
