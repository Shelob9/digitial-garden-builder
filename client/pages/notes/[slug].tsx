import NoteApp from "../../components/NoteApp";
import { NoteLayoutProvider } from "../../components/useNoteLayout";
import {  useNoteSettings } from "../../components/useNotes";
import useIsLoggedInAuthorized from "../../hooks/useIsLoggedAuthorized";
import { FC } from "react";
import { INote } from "../../../types";

import { NextSeo } from 'next-seo';
import { useRouter } from "next/router";
import { useMemo } from "react";
import { gardenServiceFactory } from "services/factory";

const NoteSeo: FC<{ note: INote }> = ({ note })=> {
  let description = note.content ? note.content.substring(0, 240) : '';
  let { authorName } = useNoteSettings();
  return (
    <NextSeo
        title={note.title}
        description={description}
        //canonical="https://www.canonical.ie/"
        openGraph={{
          //url: 'https://www.url.ie/a',
          title: note.title,
          description: `Notes about ${note.title} ${authorName ? `by ${authorName}`:''}`
        }}
      />
  )

}

const Page: FC<
  { note?: INote;slug?:string }
> = ({  note,slug }) => {
  const { isLoggedIn } = useIsLoggedInAuthorized();
  const { query } = useRouter();
  let noteOne = useMemo(() => {
    if (slug) {
      return slug;
    }
    return query.slug as string ?? 'digital-garden-builder'
  }, [query,slug]);
  let noteTwo = useMemo(() =>query.noteTwo as string ?? undefined, [query]);
  let noteThree = useMemo(() => query.noteThree as string ?? undefined, [query]);
  return (
      <>
        {note && <NoteSeo note={note} />}
        <>
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
        </> 
      </>
    )
    
  }
// This function gets called at build time
//Tells next.js which notes to generate files for
export async function getStaticPaths() {
  let authToken = process.env.GITHUB_API_TOKEN;
  const gardenService = gardenServiceFactory(
    {
      owner: process.env.REPO_OWNER ?? 'shelob9',
      repo: process.env.REPO_NAME ?? 'garden-cms-test-data'
    },
    authToken
  );
  let noteIndex = await gardenService.fetchNoteIndex();
  const paths = noteIndex.map(({ slug}) => ({
    params: { slug },
  }))
  return { paths, fallback: false }
}

// This also gets called at build time
//Tells next.js which note to generate with
export async function getStaticProps({ params }) {
  const {slug} = params
  let authToken = process.env.GITHUB_API_TOKEN;
  const gardenService = gardenServiceFactory(
    {
      owner: process.env.REPO_OWNER ?? 'shelob9',
      repo: process.env.REPO_NAME ?? 'garden-cms-test-data'
    },
    authToken
  );
  const note = await gardenService.fetchNote(slug);

  // Pass post data to the page via props
  return { props: { note,slug } }
}


export default Page;


