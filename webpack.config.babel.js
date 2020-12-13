import path from 'path';
import dotenv from 'dotenv-webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export default {
    resolve: {
        extensions: ['.wasm', '.mjs', '.tsx', '.ts', '.js', 'json'],
        alias: {
            '@components': path.resolve(__dirname, './src/components'),
            '@library': path.resolve(__dirname, './src/library'),
            '@providers': path.resolve(__dirname, './src/providers'),
            '@models': path.resolve(__dirname, './src/models'),
            '@service': path.resolve(__dirname, './src/service')
        }
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 3000,
    },
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader', 'eslint-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.ts(x?)$/,
                use: [{ loader: 'ts-loader' }, { loader: 'eslint-loader' }],
                exclude: /node_modules/
            },
            {
                test: /\.css|.less$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            },
            {
                test: /\.(jpeg|png|svg|jpg|gif)$/i,
                use: ['file-loader'],
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: /node_modules\/@react-keycloak/
            }
        ],
    },
    plugins: [
        new ReactRefreshWebpackPlugin(),
        new dotenv({
            path: path.resolve(__dirname, './.env'),
            systemvars: true,
        })
    ].filter(Boolean)
};
