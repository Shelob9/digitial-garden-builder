
import React,{ FC, Fragment} from 'react'
import noteLayoutReducer from './noteLayoutReducer'
import Layout from '../components/Layout';
import Note, { INote } from '../components/Note';
import useNotes, { useNote } from './useNotes';
import useNoteLayout from './useNoteLayout';



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
  
  const { currentNotes,toggleBox,isNoteOpen,hasNote } = useNoteLayout();

  const { notes } = useNotes();

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