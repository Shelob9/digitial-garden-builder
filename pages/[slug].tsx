import NoteApp from "../components/NoteApp";
import { NotesProvider } from "../components/useNotes";
import useIsLoggedInAuthorized from "../hooks/useIsLoggedAuthorized";

const Page = ({ slug }) => {

    const { isLoggedIn, userDisplayName, isSessionLoading } = useIsLoggedInAuthorized();
    return (
      <>
        <NotesProvider>
          <NoteApp
            isLoggedIn={isLoggedIn}
            userDisplayName={userDisplayName}
            noteSlug={slug}
          />
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