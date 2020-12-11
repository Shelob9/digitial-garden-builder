import NoteApp from '../components/NoteApp';
import { NoteLayoutProvider } from '../components/useNoteLayout';
import { NotesProvider } from '../components/useNotes';
import useIsLoggedIn from '../hooks/useIsLoggedAuthorized'


const Index = ({noteSlug}) => {
  const { isLoggedIn, } = useIsLoggedIn()
  return (
    <>
      <NotesProvider>
        <NoteLayoutProvider noteSlug={noteSlug}>
          <NoteApp isLoggedIn={isLoggedIn} />
        </NoteLayoutProvider>
      </NotesProvider>
    </>
  )
}

export async function getServerSideProps({req}) {
  //let { configService } = await factory(req)
  //let noteSlug = configService.config.defaultNote || 'one';
  return {
    props: {
      noteSlug:'one'
    }
  }
}

export default Index;
