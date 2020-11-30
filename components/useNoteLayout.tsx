import { createContext, FC, useContext, useReducer, useState } from "react";
import noteLayoutReducer, { NotePostion, notePostions } from "./noteLayoutReducer";

const NoteLayoutContext = createContext(null);

//@todo setting for this
let defaultNote = 'one';
export const NoteLayoutProvider: FC<{
  children: any;
  noteSlug?: string;
}> = ({ children, noteSlug }) => {
    
    const [currentNotes, dispatchNotesAction] = useReducer(
        noteLayoutReducer,
        {
          one: {
            noteSlug: noteSlug ?? defaultNote,
            open: true,
          },
        }
  );
  
  const [focusNote, setFocusNote] = useState<notePostions>("one");
    return (
        <NoteLayoutContext.Provider value={{
          currentNotes,
          dispatchNotesAction,
          focusNote,
          setFocusNote
        }}>
            {children}
        </NoteLayoutContext.Provider>
    )
}

export default function useNoteLayout() {
  const {
    currentNotes,
    dispatchNotesAction,
    focusNote,
    setFocusNote
  } = useContext(NoteLayoutContext);
  
  const expandBox = (notePosition) => {
    dispatchNotesAction({
      notePosition,
      type: 'expandNote'
    });
  }
    const toggleBox = (notePosition) => {
        if (! isNoteOpen(notePosition)) {
          expandBox(
            notePosition,
          );
        } else {
          dispatchNotesAction({
            notePosition,
            type:'collapseNote'
          });
        }
    }
    const addNote = (notePosition: notePostions, noteId: number) => {
        dispatchNotesAction({
            notePosition,
            noteId,
            type: 'addNote'
        })
    };

    const removeNote = (notePosition: notePostions) => {
        dispatchNotesAction({
            notePosition,
            type: 'removeNote'
        })
    };
    const hasNote = (notePosition) => currentNotes.hasOwnProperty(notePosition);
  const isNoteOpen = (notePosition) => hasNote(notePosition) && currentNotes[notePosition].open;
  
  const getPositionByNoteId = (noteId: number): notePostions|undefined => {
    let found = undefined;
    Object.keys(currentNotes).forEach(
      (position) => {
        if (hasNote(position) && noteId === currentNotes[position].noteId) {
          found = position;
        }
      }
    )
    return found;
  }

  const isNoteIdOpen = (noteId: number) => {
    const position = getPositionByNoteId(noteId);
    return position && isNoteOpen(position);
  }

  return {
    currentNotes,
    dispatchNotesAction,
    toggleBox,
    hasNote,
    isNoteOpen,
    addNote,
    removeNote,
    isNoteIdOpen,
    getPositionByNoteId,
    expandBox,
    focusNote,
    setFocusNote
  };
}