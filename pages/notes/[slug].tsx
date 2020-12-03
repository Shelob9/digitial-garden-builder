import NoteApp from "../../components/NoteApp";
import { NoteLayoutProvider } from "../../components/useNoteLayout";
import { NotesProvider } from "../../components/useNotes";
import useIsLoggedInAuthorized from "../../hooks/useIsLoggedAuthorized";

const Page = ({ noteOne,noteTwo,noteThree }) => {
    const { isLoggedIn, userDisplayName, isSessionLoading } = useIsLoggedInAuthorized();
    return (
      <>
        <NotesProvider>
          <NoteLayoutProvider
            noteSlug={noteOne}
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
export async function getServerSideProps(context) {
  const { params, query } = context;
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