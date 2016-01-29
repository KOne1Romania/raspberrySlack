var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var packageJSON = require('./package.json');
var appVersion = packageJSON.version;
var appName = packageJSON.name;
var _ = require('lodash');


const PORT = 3001;

var envConfig = {
  development: {
    js: '[name].js',
    css: '[name].css',
    img: '[path][name].[ext]',
  },

  production: {
    js: '[name]-[hash].js',
    css: '[name]-[hash].css',
    img: '[path][name]-[hash].[ext]',
  },
};

var env = process.env.NODE_ENV || 'development';

var config = envConfig[env];

//
// DEFAULT PLUGINS
//
config.plugins = [
  new webpack.DefinePlugin({
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development' || true),
    __PROD__: JSON.stringify(process.env.NODE_ENV === 'production' || false),
    CONFIG: JSON.stringify(_.pick(process.env, 'API_URL')),
  }),
  new ExtractTextPlugin(config.css),

];

// DEVELOPMENT PLUGINS
if (env === 'development') {
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
}

// PRODUCTION PLUGINS
if (env === 'production') {
  var AssetsWebpackPlugin = require('assets-webpack-plugin');
  config.plugins.push(
    new AssetsWebpackPlugin({path: path.join(__dirname, 'build'), filename: 'assets.json'}),
    new webpack.BannerPlugin('App ' + appName + ' version: ' + appVersion, {entryOnly: true}),

    // new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        sequences: true,
        dead_code: true,
        drop_debugger: true,
        comparisons: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        if_return: true,
        join_vars: true,
        cascade: true,
        drop_console: true,
      },
      output: {
        comments: false,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  );
}

//
// DEFAULT LOADERS
//
config.loaders = [

  {
    test: /\.css/,
    loader: 'style-loader!css-loader'
  },
  // SCSS
  {
    test: /\.scss/,
    loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 version!sass-loader?outputStyle=expanded&' +
    'includePaths[]=' +
    (path.join(__dirname, '/../bower_components')) + '&' +
    'includePaths[]=' +
    (path.join(__dirname, '/../node_modules')),
  },
  {
    test: /\.less$/,
    loader: "style!css!less"
  },
  // IMAGES
  {
    test: /.*\.(gif|png|jpe?g|svg)$/i,
    loaders: [
      'file?hash=sha512&digest=hex&name=' + config.img,
      'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
    ],
  },
  {
    test: /\.json$/,
    loader: "json-loader"
  },
  {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff"},
  {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"}

];

//DEVELOPMENT LOADERS
if (env === 'development') {
  config.loaders.push(
    // ES6 trough Babel
    {
      test: /\.js$|.jsx$/,
      loaders: ['react-hot', 'babel'],
      exclude: /(node_modules)/,
    },
    {
      test: require.resolve("react"),
      loader: "expose?React"
    })
}

//PRODUCTION LOADERS
if (env === 'production') {
  config.loaders.push(
    // ES6 trough Babel
    {
      test: /\.js$|.jsx$/,
      loaders: ['babel'],
      exclude: /(node_modules)/,
    })
}

module.exports = {
  context: path.join(__dirname, 'src'),

  entry: {
    orderCoffee: 'orderCoffee.js',
  },
  output: {
    path: 'build/assets',
    filename: config.js,
    publicPath: '/assets/',
  },
  cache: env === 'development',
  debug: env === 'development',
  devtool: env === 'development' ? 'eval-source-map' : '',
  module: {
    preLoaders: [],
    loaders: config.loaders,
  },

  resolve: {
    root: [path.join(__dirname, 'src')],
    extensions: ['', '.js', '.jsx', '.es6', '.scss'],
  },

  plugins: config.plugins,

  devServer: {
    contentBase: 'public',
    noInfo: false, //  --no-info option
    stats: {
      assets: true,
      colors: true,
      version: false,
      hash: false,
      timings: true,
      chunks: true,
      chunkModules: true,
    },
    hot: true,
    inline: true,
    port: PORT,
    historyApiFallback: true,
  },
};
