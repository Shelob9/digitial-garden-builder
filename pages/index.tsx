import Main from '../components/Main'
import useIsLoggedIn from '../hooks/useIsLoggedAuthorized'

const Index = () => {
  const {isLoggedIn,userDisplayName,isSessionLoading} = useIsLoggedIn()
  return (
    <Main>
      <h1 className={`text-5xl font-bold text-purple-500 ${isSessionLoading ? 'animate-pulse': ''}`}>
    
        Hi {isLoggedIn ? userDisplayName : 'Roy'}
      </h1>
    </Main>
  )
}

export default Index;
