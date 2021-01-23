import { FC, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Graph } from "react-d3-graph";
import useNotes from "./useNotes";
import { INote, NoteReference } from '../../types'
import { NodeGraphData } from '../../types/graphs';
import {useRouter} from "next/router";

// the graph configuration, just override the ones you need
const myConfig ={
  "automaticRearrangeAfterDropNode": false,
  "collapsible": false,
  "directed": false,
  "focusAnimationDuration": 0.75,
  "focusZoom": 1,
  "freezeAllDragEvents": false,
  "height": 800,
  "highlightDegree": 1,
  "highlightOpacity": 1,
  "linkHighlightBehavior": false,
  "maxZoom": 8,
  "minZoom": 0.1,
  "nodeHighlightBehavior": false,
  "panAndZoom": false,
  "staticGraph": false,
  "staticGraphWithDragAndDrop": false,
  "width": 1000,
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
    "fontSize": 12,
    "fontWeight": "normal",
    "highlightColor": "SAME",
    "highlightFontSize": 8,
    "highlightFontWeight": "normal",
    "highlightStrokeColor": "SAME",
    "highlightStrokeWidth": "SAME",
    "mouseCursor": "pointer",
    "opacity": 1,
    "renderLabel": true,
    "size": 200,
    "strokeColor": "none",
    "strokeWidth": 1.5,
    "svg": "",
    "symbolType": "circle",
    labelProperty:'label'
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



//Reducer for managing all notes as a collection.
const noteReducer = (state: INote[], action: { type: 'ADD_NOTE', note: INote }):INote[] => {
  switch (action.type) {
    case 'ADD_NOTE':{
      let { note } = action;
      return [...state, note];
    }
    default:
      return state;
  }
}

const onClickLink = function(source, target) {
  //
};

//Hook for managing all notes as a collection
function useAllNotes() {
  const { notes, fetchNote } = useNotes();

  const [allNotes, dispatch] = useReducer(noteReducer, []);
  function addNote(note: INote){
    dispatch({ type: 'ADD_NOTE', note });
  };
  const [allLoaded, setAllLoaded] = useState<boolean>(false);
  useEffect(() => {
    if (notes.length) {
      notes.forEach(note => {
        fetchNote(note.slug).then(addNote);
      });
    }
  }, [notes]);
  useEffect(() => {
    if (allNotes.length >= notes.length) {
      setAllLoaded(true);
    } else {
      setAllLoaded(false);
    }
  }, [notes, allNotes]);
  return {
    allNotes,notes,allLoaded
  }
}

/**
 * Displays all notes as a graph
 */
const NoteGraph: FC<{ closeGraph: () => void;id:string}>= ({closeGraph,id}) => {
  const {
    allNotes, notes, allLoaded
  } = useAllNotes();
  const graphRef = useRef<SVGElement>();
  const router = useRouter();
  const onClickNode = (noteSlug:string) => {
    router.push(`/notes/${noteSlug}`);
    closeGraph();
  };
  
  let data = useMemo<NodeGraphData>(() => {
    let nodes = [];
    let links = [];
    if (allLoaded) {
      allNotes.forEach(note => {
        nodes.push(
          {
            id: note.slug,
            
            label: note.title,
          }
        );
        if (note.references) {
          note.references.forEach((noteLink: NoteReference) => {
            links.push(
              {
                source: note.slug, target: noteLink.slug, }
            )
          })
        }
      })
    } else {
      if (notes) {
        nodes = notes.map(note => {
          return {
            id: note.slug
          }
        })
      }
    }
    
    return {
      nodes,
      links
    }
  }, [allLoaded, notes]);
  


return <Graph
  id={id}
  data={data}
  config={myConfig}
  onClickNode={onClickNode}
  onClickLink={onClickLink}
  ref={graphRef}
/>;
}

export default NoteGraph;