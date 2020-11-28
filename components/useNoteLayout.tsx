import { createContext, useContext, useReducer } from "react";
import noteLayoutReducer, { NotePostion, notePostions } from "./noteLayoutReducer";

const NoteLayoutContext = createContext(null);
let intitalState = {
    one: {
      noteId: 1,
      open: true,
    },
    two: {
      noteId: 2,
      open:false,
    }
  
  }
  
export const NoteLayoutProvider = ({ children }) => {
    const [currentNotes, dispatchNotesAction] = useReducer(
        noteLayoutReducer,
        intitalState
      );
    return (
        <NoteLayoutContext.Provider value={{
            currentNotes, dispatchNotesAction
        }}>
            {children}
        </NoteLayoutContext.Provider>
    )
}

export default function useNoteLayout() {
    const { currentNotes, dispatchNotesAction } = useContext(NoteLayoutContext);
    const toggleBox = (notePosition) => {
        if (! isNoteOpen(notePosition)) {
          dispatchNotesAction({
            notePosition,
            type:'expandNote'
          });
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

    const removeNote = (notePosition: notePostions, noteId: number) => {
        dispatchNotesAction({
            notePosition,
            noteId,
            type: 'removeNote'
        })
    };
    const hasNote = (notePosition) => currentNotes.hasOwnProperty(notePosition);
    const isNoteOpen = (notePosition) => hasNote(notePosition) &&currentNotes[notePosition].open;
    return {
        currentNotes,
        dispatchNotesAction,
        toggleBox,
        hasNote,
        isNoteOpen,
        addNote,
        removeNote
    };
}