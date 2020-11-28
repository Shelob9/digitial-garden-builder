
import React,{useEffect,useState,useMemo, FC, Fragment} from 'react'
import noteReducer from './noteReducer'
import Layout from '../components/Layout';
import Note, { INote } from '../components/Note';
import useSWR, { SWRConfig } from 'swr'
import useNotes, { useNote } from './useNotes';





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

const NoteWrap: FC<{
  noteId: number;
  isOpen: boolean;
  toggleBox: () => void
}> = ({ noteId, isOpen, toggleBox }) => {
  const note = useNote({ noteId });
  if (note) {
    return <Note
        note={note}
        isOpen={isOpen}
        onCollapseButton={toggleBox}
    />
  }
  return <Fragment />
}

const NoteApp: FC<{ noteSlug?: string, isLoggedIn: boolean; userDisplayName?:string;}>= ({noteSlug,userDisplayName,isLoggedIn}) => {
  
  const [currentNotes, dispatchNotesAction] = React.useReducer(
    noteReducer,
    intitalState
  );

  const { notes } = useNotes();
  const hasNote = (notePosition) => currentNotes.hasOwnProperty(notePosition);
  const isNoteOpen = (notePosition) => hasNote(notePosition) &&currentNotes[notePosition].open;
  
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

  return (
    <>
      <Layout >
        {notes ? (
          <>
            <NoteWrap
              noteId={currentNotes.one.noteId}
              isOpen={isNoteOpen('one')}
              toggleBox={() => toggleBox('one')}
            />
            {hasNote('two') && <NoteWrap
              noteId={currentNotes.two.noteId}
              isOpen={isNoteOpen('two')}
              toggleBox={() => toggleBox('two')}
            />}
            {hasNote('three') && <NoteWrap
              noteId={currentNotes.three.noteId}
              isOpen={isNoteOpen('three')}
              toggleBox={() => toggleBox('three')}
            />}
          </>
          ) : <div>Loading</div>}
        </Layout>
    </>
  ) 
}

export default NoteApp;