import { redisClient } from './redisClient.js';

export async function cacheWithRedis(req, res, next) {
    const key = req.originalUrl;

    try {
        const cachedResponse = await redisClient.get(key);
        if (cachedResponse) {
            console.log('response was taken from the cache', key);
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send(cachedResponse);
        } else {
            next();
        }
    } catch (err) {
        console.error(err);
        next();
    }
}