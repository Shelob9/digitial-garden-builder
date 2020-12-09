module.exports = doubleBrackets
var visit = require('unist-util-visit')

const change = () => {

}
function doubleBrackets(options) {
  

  return transformer

  function transformer(tree, file) {
    if (!tree.children){
      return;
    }
    console.log(tree);
    visit(tree,"link", visitor)
    function visitor(node) {
     console.log(node)
    }
  }
}