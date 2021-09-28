const path= require('path');

const PATHS={
    app: path.join(__dirname,'jsx'),
    build: path.join(__dirname,'js')
};

module.exports={
    entry: './jsx/app.jsx',
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {   
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader:'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};

