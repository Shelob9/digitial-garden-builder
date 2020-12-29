
let config = {
//@see https://nextjs.org/docs/api-reference/next.config.js/exportPathMap
exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
    ) {
        return {
            ...defaultPathMap,
            '/': { page: '/' },
        };
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