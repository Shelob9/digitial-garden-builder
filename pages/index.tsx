import useIsLoggedIn from '../hooks/useIsLoggedAuthorized'

const Index = () => {
  const {isLoggedIn,userDisplayName,isSessionLoading} = useIsLoggedIn()
  return (
    <>
      <h1 className={`${isSessionLoading ? 'animate-pulse': ''}`}>
        Hi {isLoggedIn ? userDisplayName : 'Roy'}
      </h1>
    </>
  )
}

export default Index;
