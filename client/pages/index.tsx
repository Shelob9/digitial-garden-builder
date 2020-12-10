import NoteApp from '../components/NoteApp';
import { NoteLayoutProvider } from '../components/useNoteLayout';
import { NotesProvider } from '../components/useNotes';
import useIsLoggedIn from '../hooks/useIsLoggedAuthorized'
import factory from '../services/serviceFactories';
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

export async function getServerSideProps({req}) {
  let { configService } = await factory(req)
  let noteSlug = configService.config.defaultNote || 'one';
  return {
    props: {
      noteSlug
    }
  }
}

export default Index;
