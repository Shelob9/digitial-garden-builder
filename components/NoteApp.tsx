
import React,{ FC, Fragment, useEffect} from 'react'
import { notePostions } from './noteLayoutReducer'
import Layout from '../components/Layout';
import Note, { INote } from '../components/Note';
import useNotes, { useNote } from './useNotes';
import useNoteLayout from './useNoteLayout';
import { useRouter } from 'next/router'

const NoteWrap: FC<{
  noteId: number;
  isOpen: boolean;
  toggleBox: () => void,
  position: notePostions
}> = (props) => {
  const note = useNote({ noteId: props.noteId });
  const { setFocusNote, focusNote, expandBox } = useNoteLayout();
  
  
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

const NoteApp: FC<{ noteSlug?: string, isLoggedIn: boolean; userDisplayName?: string; }> = ({ noteSlug, userDisplayName, isLoggedIn }) => {
  //https://nextjs.org/docs/api-reference/next/router
  const router = useRouter()
  //Controls the three note slots
  const { currentNotes,toggleBox,isNoteOpen,hasNote } = useNoteLayout();

  //The actual notes
  const { notes,getNote } = useNotes();

  useEffect(() => {
    let noteOne = hasNote('one') ? getNote(currentNotes.one.noteId) : undefined;
    if (!noteOne) {
      return;
    }
    let noteTwo = hasNote('two') ? getNote(currentNotes.two.noteId) : undefined;
    let noteThree = hasNote('three') ? getNote(currentNotes.three.noteId) : undefined;
    let href = `/notes/${noteOne.slug}`;
    if (noteTwo) {
      href = `${href}?noteTwo=${noteTwo.slug}`;
    }
    if (noteThree) {
      href = `${href}&noteThree=${noteThree.slug}`;
    }
    router.push(href);
  
  }, [currentNotes]);

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