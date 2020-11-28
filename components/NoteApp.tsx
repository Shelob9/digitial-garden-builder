
import React,{ FC, Fragment} from 'react'
import noteLayoutReducer, { notePostions } from './noteLayoutReducer'
import Layout from '../components/Layout';
import Note, { INote } from '../components/Note';
import useNotes, { useNote } from './useNotes';
import useNoteLayout from './useNoteLayout';

const NoteWrap: FC<{
  noteId: number;
  isOpen: boolean;
  toggleBox: () => void,
  position: notePostions
}> = (props) => {
  const note = useNote({ noteId: props.noteId });
  const { setFocusNote,focusNote,expandBox} = useNoteLayout();
  if (note) {
    return <Note
      {...{
        ...props, ...{
          focusNote,
          note
        }
      }}
      onNoteFocus={(position) => {
        expandBox(position);
        setFocusNote(position);
      }}
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
              position={"one"}
            />
            {hasNote('two') && <NoteWrap
              noteId={currentNotes.two.noteId}
              isOpen={isNoteOpen('two')}
              toggleBox={() => toggleBox('two')}
              position={"two"}

            />}
            {hasNote('three') && <NoteWrap
              noteId={currentNotes.three.noteId}
              isOpen={isNoteOpen('three')}
              toggleBox={() => toggleBox('three')}
              position={"three"}

            />}
          </>
          ) : <div>Loading</div>}
        </Layout>
    </>
  ) 
}

export default NoteApp;