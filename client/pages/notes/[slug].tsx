import NoteApp from "../../components/NoteApp";
import { NoteLayoutProvider } from "../../components/useNoteLayout";
import { NotesProvider } from "../../components/useNotes";
import useIsLoggedInAuthorized from "../../hooks/useIsLoggedAuthorized";
import { FC } from "react";
import { INote } from "../../../types";

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
    const { isLoggedIn } = useIsLoggedInAuthorized();
    return (
      <>
        {note && <NoteSeo note={note} />}
        <NotesProvider>
          <NoteLayoutProvider
            noteSlug={noteOne}
          >
            <NoteApp
              isLoggedIn={isLoggedIn}
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


export async function getServerSideProps({req,params, query}) {
  const { slug } = params;
  const { noteThree, noteTwo } = query;

  return {
    props: {
        slug,
        noteOne: slug,
        noteTwo: noteTwo ?? '',
        noteThree: noteThree ?? ''
    },
  }
}