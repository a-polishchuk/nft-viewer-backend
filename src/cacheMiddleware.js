const NodeCache = require('node-cache');

const cache = new NodeCache({
    stdTTL: 10 * 60,
    checkperiod: 2 * 60,
});

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
        console.log('response was taken from the cache', key);
        return res.status(200).json(cachedResponse);
    } else {
        next();
    }
};

module.exports = {
    cache,
    cacheMiddleware
};