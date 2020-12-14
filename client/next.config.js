module.exports = {
    //@see https://nextjs.org/docs/api-reference/next.config.js/exportPathMap
    exportPathMap: async function (
        defaultPathMap,
        { dev, dir, outDir, distDir, buildId }
    ) {
        return {
            '/': { page: '/' },
            '/about': { page: '/about' },
            '/p/hello-nextjs': { page: '/post', query: { title: 'hello-nextjs' } },
        }
    }
}