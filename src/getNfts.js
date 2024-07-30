const axios = require('axios');
const { cache } = require('./cacheMiddleware');

async function getNfts(req, res) {
    const wallet = req.params.wallet;
    const query = req.query;

    try {
        const url = `https://api.opensea.io/api/v2/chain/ethereum/account/${wallet}/nfts`;
        const response = await axios.get(url, {
            headers: {
                'X-API-KEY': process.env.OPENSEA_API_KEY,
            },
            params: query,
        });

        cache.set(req.originalUrl, response.data);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getNfts
};