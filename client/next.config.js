
const fetch = require('cross-fetch');


let config = {
//@see https://nextjs.org/docs/api-reference/next.config.js/exportPathMap
exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
    ) {
        let noteIndex = await fetch(`${process.env.NEXT_PUBLIC_GARDEN_SERVER_URL ? process.env.NEXT_PUBLIC_GARDEN_SERVER_URL :
			'https://digitalgardenbuilder.app'}/api/notes`, {
            method: 'GET',
            headers:  {
                'content-type': 'application/json',
                'x-garden-public': process.env.NEXT_PUBLIC_GARDEN_SERVER_PUBLIC_KEY,
            },
        })
            .then((r) => r.json())
            .then((r) => {
                return r.noteIndex
            });
        let pages = {
            ...defaultPathMap,
            '/': { page: '/' },
        };
        noteIndex.forEach(({url,slug}) => {
            pages[url] = { page: url, query: {slug} }
        });
        return pages;
},
}
//For GH pages without custom domains
//https://dev.to/jameswallis/deploying-a-next-js-app-to-github-pages-24pn
if (process.env.USE_REPO_PREFIX) {
    config = {
        ...config,
        basePath: `/${process.env.REPO_NAME}`,
        assetPrefix: `/${process.env.REPO_NAME}`,
    }
}

module.exports = config;