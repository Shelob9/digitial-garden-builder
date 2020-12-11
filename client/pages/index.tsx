//import NoteApp from '../components/NoteApp';
import { NoteLayoutProvider } from '../components/useNoteLayout';
import useNotes, { NotesProvider } from '../components/useNotes';
import useIsLoggedIn from '../hooks/useIsLoggedAuthorized'

const NotesApp = () => {
  const { notes } = useNotes();
  console.log(notes);
  return<div>Notes</div>
}
const Index = ({noteSlug}) => {
  const { isLoggedIn, } = useIsLoggedIn()

  return (
    <>
      <NotesProvider>
        <NoteLayoutProvider noteSlug={noteSlug}>
          <NotesApp />
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
