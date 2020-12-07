import NoteApp from '../components/NoteApp';
import { NoteLayoutProvider } from '../components/useNoteLayout';
import { NotesProvider } from '../components/useNotes';
import useIsLoggedIn from '../hooks/useIsLoggedAuthorized'
import { settingsApiServiceFactory } from '../serviceFactories';
const Index = ({noteSlug}) => {
  const {isLoggedIn,userDisplayName} = useIsLoggedIn()
  return (
    <>
      <NotesProvider>
        <NoteLayoutProvider noteSlug={noteSlug}>
          <NoteApp isLoggedIn={isLoggedIn} userDisplayName={userDisplayName} />
        </NoteLayoutProvider>
      </NotesProvider>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = undefined;
  const authToken = session && session.authToken ? session.authToken : null;
  let configService = await settingsApiServiceFactory(authToken)
  let noteSlug = configService.config.defaultNote || 'one';
  return {
    props: {
      noteSlug
    }
  }
}

export default Index;
