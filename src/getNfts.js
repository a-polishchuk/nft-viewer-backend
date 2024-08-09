import axios from 'axios';
import { redisClient, TTL } from './redisClient.js';

export async function getNfts(req, res) {
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

        const stringResp = JSON.stringify(response.data);
        const key = req.originalUrl;
        await redisClient.set(key, stringResp, { EX: TTL });

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
