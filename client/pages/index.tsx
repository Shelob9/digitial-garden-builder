import NoteApp from '../components/NoteApp';
import { NoteLayoutProvider } from '../components/useNoteLayout';
import { NotesProvider } from '../components/useNotes';
import useIsLoggedIn from '../hooks/useIsLoggedAuthorized'


const Index = () => {
  const { isLoggedIn, } = useIsLoggedIn()
  return (
    <>
      <>
        <NoteLayoutProvider>
          <NoteApp isLoggedIn={isLoggedIn} />
        </NoteLayoutProvider>
      </>
    </>
  )
}


export default Index;
