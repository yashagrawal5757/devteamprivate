const path = require('path')

module.exports = {
    plugins: [
        {
            plugin: require("craco-cesium")()
        }
    ],
    webpack: {
        alias: {
            '@contexts': path.resolve(__dirname, 'src/shared/contexts'),
            '@enums': path.resolve(__dirname, 'src/shared/enums'),
            '@hooks': path.resolve(__dirname, 'src/shared/hooks'),
            '@metadata': path.resolve(__dirname, 'src/shared/metadata'),
            '@models': path.resolve(__dirname, 'src/shared/models'),
            '@routes': path.resolve(__dirname, 'src/shared/routes'),
            '@services': path.resolve(__dirname, 'src/shared/services'),
            '@custom-types': path.resolve(__dirname, 'src/shared/types'),
            '@ui': path.resolve(__dirname, 'src/shared/ui'),
            '@core': path.resolve(__dirname, 'src/core'),
            '@state': path.resolve(__dirname, 'src/state'),
            '@dashboard': path.resolve(__dirname, 'src/modules/protected/dashboard'),
            '@explore': path.resolve(__dirname, 'src/modules/protected/explore-hybrid'),
            '@watchlist': path.resolve(__dirname, 'src/modules/protected/watchlist')
        },
    },
};