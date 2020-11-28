import NoteApp from '../components/NoteApp';
import { NotesProvider } from '../components/useNotes';
import useIsLoggedIn from '../hooks/useIsLoggedAuthorized'

const Index = () => {
  const {isLoggedIn,userDisplayName,isSessionLoading} = useIsLoggedIn()
  return (
    <>
      <NotesProvider>
        <NoteApp isLoggedIn={isLoggedIn} userDisplayName={userDisplayName} />
      </NotesProvider>
    </>
  )
}

export default Index;
