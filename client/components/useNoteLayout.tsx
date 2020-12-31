import { createContext, FC, Ref, useContext, useEffect, useReducer, useRef, useState } from "react";
import noteLayoutReducer, {  notePostions } from "./noteLayoutReducer";
import { useNoteSettings } from "./useNotes";
import { useMediaQuery } from 'react-responsive'

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

  let noteOneRef = useRef<HTMLDivElement>();
  let noteTwoRef = useRef<HTMLDivElement>();
  let noteThreeRef = useRef<HTMLDivElement>();

  const getNoteRef = (position: notePostions) => {
    let ref: Ref<HTMLDivElement>;
    switch (position) {
      case 'three':
          ref = noteThreeRef;
        break;
      case 'two':
          ref = noteTwoRef;
          break;
      
        case 'one':
        default:
          ref = noteOneRef;
        break;
    }
    return ref;
  }
  const _scrollToNote = (position: notePostions) => {
    let ref = getNoteRef(position);
    if (!ref || !ref.current) {
      return;
    }
    ref.current.scrollIntoView({
      behavior: "smooth",
    });
  }
  
  const expandBox = (notePosition:notePostions) => {
    dispatchNotesAction({
      notePosition,
      type: 'expandNote'
    });
  }

  const collapseBox = (notePosition: notePostions) => {
    dispatchNotesAction({
      notePosition,
      type:'collapseNote'
    });
  }

  const toggleBox = (notePosition:notePostions) => {
      if (! isNoteOpen(notePosition)) {
        expandBox(
          notePosition,
        );
      } else {
        collapseBox(
          notePosition,
        );
      }
  }
  const addNote = (notePosition: notePostions, noteSlug: string) => {
    dispatchNotesAction({
      notePosition,
      noteSlug,
      type: 'addNote'
    });
    _scrollToNote(notePosition)
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
        //@ts-ignore
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
    _scrollToNote(openPosition);
    
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
    collapseBox,
    focusNote,
    setFocusNote,
    findNotePostion,
    openInNextPosition,
    getNoteRef
  };
}