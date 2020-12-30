import { useMemo } from "react";
import { Graph } from "react-d3-graph";
import useNotes from "./useNotes";

const NoteGraph = () => {
  const { notes } = useNotes();

  let data = useMemo(() => {
    let nodes = [];
    let links = [];
    if (notes) {
      nodes = notes.map(note => {
        return {
          id: note.slug
        }
      })
    }
    return {
      nodes,
      links
    }
  }, [notes]);
    // graph payload (with minimalist structure)
const _data = {
  nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" },{ id: "Roy" }],
  links: [
    { source: "Harry", target: "Sally", },
    { source: "Harry", target: "Alice", },
    { source: "Roy", target: "Alice", },
    { source: "Roy", target: "Sally", },
    { source: "Roy", target: "Harry", },
  ],
};

// the graph configuration, just override the ones you need
const myConfig ={
  "automaticRearrangeAfterDropNode": false,
  "collapsible": false,
  "directed": false,
  "focusAnimationDuration": 0.75,
  "focusZoom": 1,
  "freezeAllDragEvents": false,
  "height": 400,
  "highlightDegree": 1,
  "highlightOpacity": 1,
  "linkHighlightBehavior": false,
  "maxZoom": 8,
  "minZoom": 0.1,
  "nodeHighlightBehavior": false,
  "panAndZoom": false,
  "staticGraph": false,
  "staticGraphWithDragAndDrop": false,
  "width": 800,
  "d3": {
    "alphaTarget": 0.05,
    "gravity": -100,
    "linkLength": 100,
    "linkStrength": 1,
    "disableLinkForce": false
  },
  "node": {
    "color": "#d3d3d3",
    "fontColor": "black",
    "fontSize": 8,
    "fontWeight": "normal",
    "highlightColor": "SAME",
    "highlightFontSize": 8,
    "highlightFontWeight": "normal",
    "highlightStrokeColor": "SAME",
    "highlightStrokeWidth": "SAME",
    "labelProperty": "id",
    "mouseCursor": "pointer",
    "opacity": 1,
    "renderLabel": true,
    "size": 200,
    "strokeColor": "none",
    "strokeWidth": 1.5,
    "svg": "",
    "symbolType": "circle"
  },
  "link": {
    "color": "#d3d3d3",
    "fontColor": "black",
    "fontSize": 8,
    "fontWeight": "normal",
    "highlightColor": "SAME",
    "highlightFontSize": 8,
    "highlightFontWeight": "normal",
    "labelProperty": "label",
    "mouseCursor": "pointer",
    "opacity": 1,
    "renderLabel": false,
    "semanticStrokeWidth": false,
    "strokeWidth": 1.5,
    "markerHeight": 6,
    "markerWidth": 6,
    "strokeDasharray": 0,
    "strokeDashoffset": 0,
    "strokeLinecap": "butt"
  }
};

const onClickNode = function(nodeId) {
  window.alert(`Clicked node ${nodeId}`);
};

const onClickLink = function(source, target) {
  window.alert(`Clicked link between ${source} and ${target}`);
};

return <Graph
  id="graph-id" // id is mandatory
  data={data}
  config={myConfig}
  onClickNode={onClickNode}
  onClickLink={onClickLink}
/>;
}

export default NoteGraph;