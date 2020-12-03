
import React,{ FC, Fragment, useEffect, useMemo} from 'react'
import Layout from '../components/Layout';
import Note, { INote } from '../components/Note';
import useNotes, { useSingleNote } from './useNotes';
import useNoteLayout from './useNoteLayout';
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo';


const NoteSeo: FC<{ slug: string }> = ({ slug })=> {
  const { note } = useSingleNote({ slug });
  let description = useMemo(() => note ? note.content.substring(0, 240) : '',[note])
  return note ? (
    <NextSeo
        title={note.title}
        description={description}
        //canonical="https://www.canonical.ie/"
        openGraph={{
          //url: 'https://www.url.ie/a',
          title: note.title,
          description
        }}
      />
  ): <Fragment />

}

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
  const { notes, getNote, findBySlug } = useNotes();
  

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
      <NoteSeo slug={currentNotes.one.slug} />
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