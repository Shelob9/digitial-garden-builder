import NoteApp from "../../components/NoteApp";
import { NoteLayoutProvider } from "../../components/useNoteLayout";
import { NotesProvider } from "../../components/useNotes";
import useIsLoggedInAuthorized from "../../hooks/useIsLoggedAuthorized";
import { getSession } from 'next-auth/client';
import { noteApiServicefactory } from "../../serviceFactories";
import { FC } from "react";
import { INote } from "../../components/Note";

import { NextSeo } from 'next-seo';


const NoteSeo: FC<{ note: INote }> = ({ note })=> {
  let description = note.content ? note.content.substring(0, 240) : '';
  return (
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
  )

}

const Page: FC<
  { noteOne: string; noteTwo?: string; noteThree?: string; note?:INote }
> = ({ noteOne, noteTwo, noteThree, note }) => {
    const { isLoggedIn, userDisplayName, isSessionLoading } = useIsLoggedInAuthorized();
    return (
      <>
        <NoteSeo note={note} />
        <NotesProvider>
          <NoteLayoutProvider
            noteSlug={noteOne}
          >
            <NoteApp
              initialNote={note}
              isLoggedIn={isLoggedIn}
              userDisplayName={userDisplayName}
              noteOneSlug={noteOne}
              noteTwoSlug={noteTwo}
              noteThreeSlug={noteThree}
            />
         </NoteLayoutProvider>
        </NotesProvider> 
      </>
    )
    
}

export default Page;


export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { params, query } = context;
  const { slug } = params;
  const { noteThree, noteTwo } = query;

  let noteService = await noteApiServicefactory(
    session && session.authToken ? session.authToken : null
  );
  let note = await noteService.fetchNote(slug);
  return {
    props: {
        note,
        slug,
        noteOne: slug,
        noteTwo: noteTwo ?? '',
        noteThree: noteThree ?? ''
    },
  }
}