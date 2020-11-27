import NoteApp from '../components/NoteApp';
import useIsLoggedIn from '../hooks/useIsLoggedAuthorized'

const Index = () => {
  const {isLoggedIn,userDisplayName,isSessionLoading} = useIsLoggedIn()
  return (
    <>
      <NoteApp />
    </>
  )
}

export default Index;
