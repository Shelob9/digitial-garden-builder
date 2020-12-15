import NoteApp from '../components/NoteApp';
import { NoteLayoutProvider } from '../components/useNoteLayout';
import { NotesProvider } from '../components/useNotes';
import useIsLoggedIn from '../hooks/useIsLoggedAuthorized'


const Index = () => {
  const { isLoggedIn, } = useIsLoggedIn()
  return (
    <>
      <NotesProvider>
        <NoteLayoutProvider noteSlug={'digital-garden-builder'}>
          <NoteApp isLoggedIn={isLoggedIn} />
        </NoteLayoutProvider>
      </NotesProvider>
    </>
  )
}


export default Index;
