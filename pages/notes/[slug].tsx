import NoteApp from "../../components/NoteApp";
import { NoteLayoutProvider } from "../../components/useNoteLayout";
import { NotesProvider } from "../../components/useNotes";
import useIsLoggedInAuthorized from "../../hooks/useIsLoggedAuthorized";

const Page = ({ slug }) => {

    const { isLoggedIn, userDisplayName, isSessionLoading } = useIsLoggedInAuthorized();
    return (
      <>
        <NotesProvider>
          <NoteLayoutProvider>
          <NoteApp
            isLoggedIn={isLoggedIn}
            userDisplayName={userDisplayName}
            noteSlug={slug}
          />
         </NoteLayoutProvider>
          
        </NotesProvider> 
      </>
    )
    
}

export default Page;
export async function getServerSideProps({ params }) {
    const { slug } = params;
    return {
      props: {slug},
    }
  }