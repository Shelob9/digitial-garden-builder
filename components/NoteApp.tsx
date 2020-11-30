
import React,{ FC, Fragment, useEffect} from 'react'
import { notePostions } from './noteLayoutReducer'
import Layout from '../components/Layout';
import Note from '../components/Note';
import useNotes from './useNotes';
import useNoteLayout from './useNoteLayout';
import { useRouter } from 'next/router'



const NoteApp: FC<{
  noteOneSlug?: string;
  noteTwoSlug?: string;
  noteThreeSlug?: string;
  isLoggedIn: boolean;
  userDisplayName?: string;
}> = ({ noteOneSlug,noteTwoSlug,noteThreeSlug, userDisplayName, isLoggedIn }) => {
  //https://nextjs.org/docs/api-reference/next/router
  const router = useRouter()
  //Controls the three note slots
  const { currentNotes,toggleBox,isNoteOpen,hasNote,addNote } = useNoteLayout();
  //The actual notes
  const { notes, getNote,findBySlug } = useNotes();
  useEffect(() => {
    if (noteOneSlug) {
      let note = findBySlug(noteOneSlug);
      if (note) {
        addNote("one", note.id);
      }
    }
    if (noteTwoSlug) {
      let note = findBySlug(noteTwoSlug);
      if (note) {
        addNote("two", note.id);
      }
    }
    if (noteThreeSlug) {
      let note = findBySlug(noteThreeSlug);
      if (note) {
        addNote("three", note.id);
      }
    }
  },[notes])

  //When current notes change
  //Reset the href
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

  console.log(currentNotes,currentNotes.one.noteSlug);
  return (
    <>
      <Layout >
      <div className={'note-columns-scrolling-container'}>
          <div className={'note-columns-container'}>
            {notes ? (
            <>
                <Note
                  isLoggedIn={isLoggedIn}
                  slug={currentNotes.one.noteSlug}
                  isOpen={isNoteOpen('one')}
                  toggleBox={() => toggleBox('one')}
                  position={"one"}
              />
                {hasNote('two') &&
                  <Note
                      isLoggedIn={isLoggedIn}
                      slug={currentNotes.two.noteSlug}
                      isOpen={isNoteOpen('two')}
                      toggleBox={() => toggleBox('two')}
                      position={"two"}   
                  />
                }
                {hasNote('three') && 
                  <Note
                    isLoggedIn={isLoggedIn}
                    slug={currentNotes.three.noteSlug}
                    isOpen={isNoteOpen('three')}
                    toggleBox={() => toggleBox('three')}
                    position={"three"}
                  />
                }
            </>
            ) : <div>Loading</div>}
          </div>
        </div>
        
        </Layout>
    </>
  ) 
}

export default NoteApp;