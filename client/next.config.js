module.exports = {
    //@see https://nextjs.org/docs/api-reference/next.config.js/exportPathMap
    exportPathMap: async function (
        defaultPathMap,
        { dev, dir, outDir, distDir, buildId }
    ) {
        return {
            ...defaultPathMap,
            '/': { page: '/' },
            
        }
    }
}