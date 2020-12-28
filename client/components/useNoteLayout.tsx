import { createContext, FC, useContext, useReducer, useState } from "react";
import noteLayoutReducer, {  notePostions } from "./noteLayoutReducer";
import { useNoteSettings } from "./useNotes";

const NoteLayoutContext = createContext(null);
export const NoteLayoutProvider: FC<{
  children: any;
  noteSlug?: string;
}> = ({ children, noteSlug }) => {
  const { defaultNote } = useNoteSettings();
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
    const addNote = (notePosition: notePostions, noteSlug: string) => {
        dispatchNotesAction({
            notePosition,
            noteSlug,
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
  

  const findNotePostion = (noteSlug: string) => {
    let notePosition: notePostions | false= false;
    Object.keys(currentNotes).forEach(
      (pos:notePostions) => {
        if (noteSlug === currentNotes[pos].noteSlug) {
          notePosition = pos;
        }
      }
    );
    return notePosition;
  }
 

  const openInNextPosition = (noteSlug: string,openPosition:notePostions) => {
    const pos = findNotePostion(noteSlug);
			if (pos && hasNote(pos)) {
				expandBox(pos)
				setFocusNote(pos)
			} else {
				if ("one" === openPosition) {
					removeNote(
						"one"
					);
					removeNote(
						"two"
					)
					removeNote(
						"three"
					)
				}
				addNote(
					openPosition,
					noteSlug
				)
				setFocusNote(openPosition);
			}
  }
  

  return {
    currentNotes,
    dispatchNotesAction,
    toggleBox,
    hasNote,
    isNoteOpen,
    addNote,
    removeNote,
    expandBox,
    focusNote,
    setFocusNote,
    findNotePostion,
    openInNextPosition
  };
}