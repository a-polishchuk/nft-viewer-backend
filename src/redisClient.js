import { createClient } from 'redis';

export const TTL = 10 * 60;

export const redisClient = createClient({
    password: process.env.REDIS_PASSWORD, // TODO: move password to env variables/secrets
    socket: {
        host: process.env.REDIS_HOST,
        port: 13649
    }
});

redisClient.on('error', err => console.error('Redis Client Error', err));

redisClient.connect();
