import NoteApp from "../components/NoteApp";
import useIsLoggedInAuthorized from "../hooks/useIsLoggedAuthorized";

const Page = ({ slug }) => {

    const { isLoggedIn, userDisplayName, isSessionLoading } = useIsLoggedInAuthorized();
    return (
      <>
        <NoteApp isLoggedIn={isLoggedIn} userDisplayName={userDisplayName}  noteSlug={slug} />
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