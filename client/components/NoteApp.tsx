
import React,{ FC, Fragment, useEffect, useMemo} from 'react'
import Layout from '../components/Layout';
import Note from '../components/Note';
import useNotes from './useNotes';
import useNoteLayout from './useNoteLayout';
import { useRouter } from 'next/router'
import { INote } from '../../types'
import { useState } from 'react';
import NoteGraph from './NoteGraph';
import GraphButton from './GraphButton';
import { notePostions } from './noteLayoutReducer';


const NoteApp: FC<{
  noteOneSlug?: string;
  noteTwoSlug?: string;
  noteThreeSlug?: string;
  isLoggedIn: boolean;
  note?:INote
}> = ({
  noteOneSlug,
  noteTwoSlug,
  noteThreeSlug,
  isLoggedIn,
  note
}) => {
  //https://nextjs.org/docs/api-reference/next/router
  const router = useRouter();
  //Controls the three note slots
  const { currentNotes,toggleBox,isNoteOpen,hasNote,addNote, } = useNoteLayout();
  //The actual notes
  const { notes } = useNotes();
  
  //Show graph instead of notes?
  const [showGraph, setShowGraph] = useState<boolean>(false);

  //load notes based on url parsing that happend server-side
  useEffect(() => {
    if (noteOneSlug) {
        addNote("one", noteOneSlug);
    }
    if (noteTwoSlug) {
        addNote("two",noteTwoSlug);
    }
    if (noteThreeSlug) {
        addNote("three", noteThreeSlug);
    }
  },
    [
      //only run once please
    ]
  )

  //When current notes change
  //Reset the href
  useEffect(() => {
    let href = `/notes/${currentNotes.one.noteSlug}`;
    if (currentNotes.two) {
      href = `${href}?noteTwo=${currentNotes.two.noteSlug}`;
    }
    if (currentNotes.three) {
      href = `${href}&noteThree=${currentNotes.three.noteSlug}`;
    }
    router.push(href);
  }, [currentNotes]);

  

  return (
    <>
      <Layout FirstControl={() => (
        <GraphButton showGraph={showGraph} setShowGraph={setShowGraph} />)
      }>
      <div className={'note-columns-scrolling-container'}>
          <div className={'note-columns-container'}>
            {showGraph ? <NoteGraph closeGraph={() => setShowGraph(false)} /> : (
              <>
                {notes ? (
                  <>
                    <Note
                      isLoggedIn={isLoggedIn}
                      slug={currentNotes.one.noteSlug}
                      isOpen={isNoteOpen('one')}
                      toggleBox={() => toggleBox('one')}
                      position={"one"}
                      note={note}
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
              </>)}
          </div>
        </div>
        
        </Layout>
    </>
  ) 
}

export default NoteApp;