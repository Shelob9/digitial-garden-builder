import NoteApp from "../../components/NoteApp";
import { NoteLayoutProvider } from "../../components/useNoteLayout";
import { NotesProvider } from "../../components/useNotes";
import useIsLoggedInAuthorized from "../../hooks/useIsLoggedAuthorized";
import { FC } from "react";
import { INote } from "../../../types";

import { NextSeo } from 'next-seo';
import { useRouter } from "next/router";
import { useMemo } from "react";



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
  { note?:INote }
> = ({   note }) => {
  const { isLoggedIn } = useIsLoggedInAuthorized();
  const { query } = useRouter();
  let noteOne = useMemo(() => query.slug as string ?? 'digital-garden-builder', [query]);
  let noteTwo = useMemo(() =>query.noteTwo as string ?? undefined, [query]);
  let noteThree = useMemo(() => query.noteThree as string ?? undefined, [query]);
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
  let { slug } = params;
  const { noteThree, noteTwo } = query;
  slug = slug ?? 'digital-garden-builder';
  return {
    props: {
        slug,
        
    },
  }
}