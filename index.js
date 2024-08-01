const dotenv = require('dotenv');
const express = require('express');
const { getNfts } = require('./src/getNfts');
const { cacheMiddleware } = require('./src/cacheMiddleware');

const dotenvOutput = dotenv.config({
    path: process.env.NODE_ENV === 'production' ? './.env' : './.env.local',
});

console.log('dotenv configuration:');
console.log(dotenvOutput);

const port = process.env.PORT || 3000;

express()
    .get('/api/v1/:wallet/nfts', cacheMiddleware, getNfts)
    .use((req, res, next) => {
        res.status(404).send('404 Not Found');
    })
    .listen(port, () => {
        console.log(`Server is running on port :${port}`);
    });
