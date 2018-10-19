/*global __dirname*/
const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

function buildWebpackConfig({ bundleName, removedElement }) {
    return {
        mode: 'development',
        target: 'node',
        entry: {
            app: path.join(__dirname, 'src', 'app.js')
        },
        output: {
            filename: '[name].js',
            path: path.join(__dirname, 'dist', bundleName),
            chunkFilename: '[id].js',
            libraryTarget: 'commonjs'
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    include: [
                        path.resolve('./src')
                    ],
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                forceEnv: 'module',
                                // plugins: [
                                //     [ "remove-react-element", { "elementNames": [removedElement] } ]
                                // ]
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    beautify: true,
                    ecma: 6,
                    compress: true,//important: the dead code removal will remove the unused components.
                    comments: false
                }
            })
        ]
    };
}

module.exports = [
    buildWebpackConfig({ bundleName: 'mobile',  removedElement: 'Desktop' }),
    buildWebpackConfig({ bundleName: 'desktop', removedElement: 'Mobile'  }),
];