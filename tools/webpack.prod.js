/**
 * @file webpack 构建配置
 * @author chenxiao07 <chenxiao07@baidu.com>
 */

'use strict';

const webpack = require('webpack');

const config = {

    entry: {
        main: ['./src/index.js']
    },

    externals: {
        'lodash/mapValues': true,
        'lodash/get': true,
        'lodash/toPath': true,
        'lodash/startWith': true,
        'react': true,
        'react-addons-update': true,
        'redux-thunk': true,
        'shallow-equal/objects': true
    },

    output: {
        path: 'lib',
        library: 'melon-form',
        libraryTarget: 'umd',
        filename: 'index.js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: [
                    'babel'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.json(\?.*)?$/,
                loader: 'json'
            }
        ]
    },

    devtool: 'source-map',

    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
};

module.exports = config;
