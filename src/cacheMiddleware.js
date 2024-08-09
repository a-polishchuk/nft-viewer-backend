import NodeCache from 'node-cache';

export const cache = new NodeCache({
    stdTTL: 10 * 60,
    checkperiod: 2 * 60,
});

export function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
        console.log('response was taken from the cache', key);
        return res.status(200).json(cachedResponse);
    } else {
        next();
    }
};
