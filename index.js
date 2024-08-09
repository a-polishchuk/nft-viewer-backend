import dotenv from 'dotenv';
import express from 'express';
import { getNfts } from './src/getNfts.js';
import { cacheWithRedis } from './src/cacheWithRedis.js';

const dotenvOutput = dotenv.config({
    path: process.env.NODE_ENV === 'production' ? './.env' : './.env.local',
});

console.log('dotenv configuration:');
console.log(dotenvOutput);

const port = process.env.PORT || 3000;

express()
    .get('/api/v1/:wallet/nfts', cacheWithRedis, getNfts)
    .use((_req, res, _next) => {
        res.status(404).send('404 Not Found');
    })
    .listen(port, () => {
        console.log(`Server is running on port :${port}`);
    });
