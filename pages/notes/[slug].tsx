import NoteApp from "../../components/NoteApp";
import { NoteLayoutProvider } from "../../components/useNoteLayout";
import { NotesProvider } from "../../components/useNotes";
import useIsLoggedInAuthorized from "../../hooks/useIsLoggedAuthorized";
import NoteService from "../../noteService";
const Page = ({ noteOne,noteTwo,noteThree,note }) => {
    const { isLoggedIn, userDisplayName, isSessionLoading } = useIsLoggedInAuthorized();
    return (
      <>
        <NotesProvider>
          <NoteLayoutProvider
            noteId={note.id}
          >
            <NoteApp
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
export async function getServerSideProps({ params, query }) {
  const { slug } = params;
  const { noteThree, noteTwo } = query;
  const notes = new NoteService();
  let note = notes.getNoteBySlug(slug);
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