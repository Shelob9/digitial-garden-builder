import { FC } from "react";
import { INote } from "../components/Note";
import { NoteLayoutProvider } from "../components/useNoteLayout";
import { NotesProvider, useSingleNote } from "../components/useNotes";
import { useSession, getSession } from 'next-auth/client'

import { noteApiServicefactory } from "../serviceFactories";

const SingleNote: FC<{
    note: INote;
    slug: string;
}> = (props) => {
    const { slug } = props;
    const note = useSingleNote({ slug, note:props.note });
    return (
      <NotesProvider>
        <NoteLayoutProvider noteSlug={slug}>  
          <div>
              <p>{slug}</p>
              <p>{note ? note.slug : 'Loading'}</p>
          </div>
        </NoteLayoutProvider>
      </NotesProvider>
        
      
    )
}
export async function getServerSideProps(context) {
  const session = await getSession(context)

    const { slug } = context.params;
    let noteService = await noteApiServicefactory(session.authToken);
    
    let note = await noteService.fetchNote(slug);
      return {
        props: {
          note,
          slug,
      },
  }
  
  }

export default SingleNote;