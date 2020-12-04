import NoteApp from '../components/NoteApp';
import { NoteLayoutProvider } from '../components/useNoteLayout';
import { NotesProvider } from '../components/useNotes';
import useIsLoggedIn from '../hooks/useIsLoggedAuthorized'
import { getSession } from 'next-auth/client'
import { noteApiServicefactory,settingsApiServiceFactory } from '../serviceFactories';
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
  const session = await getSession(context);
  const authToken = session && session.authToken ? session.authToken : null;
  let configService = await settingsApiServiceFactory(authToken)
  let noteSlug = configService.config.defaultNoteSlug || 'one';
  return {
    props: {
      noteSlug
    }
  }
}

export default Index;
