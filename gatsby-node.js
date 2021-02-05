const axios = require('axios');

const { currentArticles } = require('../../src/utils/pressArticles/pressArticles');

require('dotenv').config({
    path: `.env${process.env.NODE_ENV}`
});

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }, options ) => {

    const { apiKey, articlesUrlArray} = options;

    const encodeUrls = (urls) => {
        const result = [];
        urls.forEach((url) => {
            result.push(
                `https://opengraph.io/api/1.1/site/${encodeURIComponent(url)}?app_id=${apiKey}`
            );
        });
        return result;
    };

    const encodedUrls = encodeUrls(articlesUrlArray);
    const metaDataArray = [];

    try {
        for (const url of encodedUrls) {
            const resp = await axios.get(url);
            const metaData = resp.data.hybridGraph;
            metaDataArray.push(metaData);
        }
    } catch (error) {
        if (error !== 200) {
            console.log(error);
        }
    }
    for (const metaDataObj of metaDataArray)  {
        const newNode = {
            ...metaDataObj,
            id: createNodeId(`OgMetadataNode-ID-${metaDataObj.url}`),
            internal: {
                type: 'ogMetadataNode',
                contentDigest: createContentDigest(metaDataObj)
            }
        };
        actions.createNode(newNode);
    }
};