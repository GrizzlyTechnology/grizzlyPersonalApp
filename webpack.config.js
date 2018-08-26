const { join, resolve } = require('path');
const webpack = require('webpack');
const glob = require('glob');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

let entries = {};
let chunks = [];
getEntriesAndChunks();

let config = {
  entry: entries,
  // devtool: 'cheap-module-source-map','
  // vendor: ['vue'],
  output: {
    path: resolve(__dirname, './dist'),
    filename: '[name].js'
    // filename: 'script/[id].js',
    // publicPath: process.env.NODE_ENV === 'development' ? '/' : 'widget://'
  },
  resolve: {
    // 配置别名，在项目中可缩减引用路径
    extensions: ['.js', '.vue'],
    alias: {
      components: join(__dirname, '/src/components'),
      config: join(__dirname, '/src/config'),
      service: join(__dirname, '/src/service'),
      assets: join(__dirname, '/src/assets'),
      util: join(__dirname, '/src/util')
    }
  },
  externals: [
    // { apiready: "window.apiready" },
    // { api: 'window.api' }
    // { MYAPP: "window.APP" }
  ],
  module: {
    rules: [
      // {
      //   test: /\.vue$/,
      //   use: 'vue-loader'
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {loaders: {
          less: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: process.env.NODE_ENV === 'production'
                }
              },
              'autoprefixer-loader',
              'less-loader'
            ]
          })
        }}
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              minimize: process.env.NODE_ENV === 'production'
            }
          }
        })
      },
      // {
      //   test: /\.less$/,
      //   use: [
      //     'style-loader',
      //     { loader: 'css-loader', options: { importLoaders: 1 } },
      //     'less-loader'
      //   ]
      // },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: process.env.NODE_ENV === 'production'
              }
            },
            'autoprefixer-loader',
            'less-loader'
          ]
        })
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            root: resolve(__dirname, 'src'),
            attrs: ['img:src', 'link:href']
          }
        }]
      },
      {
        test: /\.(png|jpe?g|gif|svg|svgz)(\?.+)?$/,
        exclude: /iconfont\.svg/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '../../../../../../../../../../../../assets/img/[name].[ext]'
          }
        }]
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        include: /assets/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/fonts/[name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env.NODE_ENV)// 清除 IS_DEV is not defined
    }),
    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => {
        return module.resource && (/node_modules/.test(module.resource) || /assets/.test(module.resource));
      }
    }),
    // 应该是异步加载的资源的chunk
    // new CommonsChunkPlugin({
    //   name: 'client',
    //   async: 'chunk-vendor',
    //   children: true,
    //   minChunks: (module, count) => {
    //     return count >= 3;
    //   }
    // }),
    new CommonsChunkPlugin({
      name: 'runtime',
      minChunks: Infinity
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    })

  ],
  devServer: {
    host: '127.0.0.1',
    port: 8880,
    historyApiFallback: false,
    noInfo: true
    // proxy: {
    //   '/apis': {
    //     target: 'http://127.0.0.1:8010',
    //     changeOrigin: true,
    //     pathRewrite: { '^/apis': '' }
    //   }
    // }
  },
  devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'development') {
  config.output.publicPath = '/';
}
const pages = getHtmls();

pages.forEach(function (pathname) {
  // filename 用文件夹名字

  let fileBasename = pathname.replace('views/', '').replace('/app', '');
  // let fileBasename = pathname.substring(6, pathname.length - 4);
  var conf = {
    filename: fileBasename + '.html', // 生成的html存放路径，相对于path
    template: 'src/' + pathname + '.html' // html模板路径
  };
  // var chunk = pathname.substring(6, pathname.length - 4);
  if (chunks.indexOf(fileBasename) > -1) {
    conf.inject = 'body';
    conf.chunks = ['runtime', 'vendor', fileBasename];
  }
  if (process.env.NODE_ENV !== 'development') {
    conf.hash = true;
  }
  config.plugins.push(new HtmlWebpackPlugin(conf));
  // config.plugins.push(new ExtractTextPlugin(fileBasename + '.css'));
});

// function getCommonChunks (chunks) {
//   let newChunks = [];
//   chunks.forEach(function (item) {
//     if (!item.includes('questions')) {
//       newChunks.push(item);
//     }
//   });
//   // console.log(newChunks);
//   return newChunks;
// }

module.exports = config;

function getEntriesAndChunks () {
  glob.sync('./src/views/**/*.js').forEach(function (name) {
    var n = name.replace('./src/views/', '').replace('.js', '').replace('/app', '');

    // var n = name.slice(name.lastIndexOf('src/') + 10, name.length - 7);
    // var n = name.slice(name.lastIndexOf('src/') + 10, name.length - 3);
    entries[n] = [name];
    chunks.push(n);
  });

  // entries['vendor'] = ['vue'];
}

function getHtmls () {
  var htmls = [];
  glob.sync('./src/views/**/*.html').forEach(function (name) {
    var n = name.replace('./src/', '').replace('.html', '');
    // var n = name.slice(name.lastIndexOf('src/') + 4, name.length - 5);
    htmls.push(n);
  });
  return htmls;
}

console.log('--------------------------------');
console.log(process.env.NODE_ENV);
console.log('--------------------------------');

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = false;
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      },
      sourceMap: false,
      parallel: true
    })
  ]);
}
