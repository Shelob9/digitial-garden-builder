import NoteApp from '../components/NoteApp';
import { NoteLayoutProvider } from '../components/useNoteLayout';
import { NotesProvider } from '../components/useNotes';
import useIsLoggedIn from '../hooks/useIsLoggedAuthorized'

const Index = () => {
  const {isLoggedIn,userDisplayName,isSessionLoading} = useIsLoggedIn()
  return (
    <>
      <NotesProvider>
        <NoteLayoutProvider>
          <NoteApp isLoggedIn={isLoggedIn} userDisplayName={userDisplayName} />
        </NoteLayoutProvider>
      </NotesProvider>
    </>
  )
}

export default Index;
