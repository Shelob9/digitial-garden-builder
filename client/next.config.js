
//@see https://github.com/martpie/next-transpile-modules
const withTM = require('next-transpile-modules')(['@garden-cms/note-api']);
module.exports = withTM({
    //@see https://nextjs.org/docs/api-reference/next.config.js/exportPathMap
    exportPathMap: async function (
        defaultPathMap,
        { dev, dir, outDir, distDir, buildId }
    ) {
        console.log(defaultPathMap);
        return {
            ...defaultPathMap,
            '/': { page: '/' },
            
        }
    }
});


