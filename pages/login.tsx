
import { signIn, signOut, useSession } from 'next-auth/client'
import { useMemo } from 'react';
import Layout from '../components/Layout';
import useIsLoggedInAuthorized from '../hooks/useIsLoggedAuthorized';

 function LoginPage() {
 
   const { isLoggedIn, isSessionLoading,userDisplayName } = useIsLoggedInAuthorized();
   return (<Layout pageDisplayTitle={'Login'}>
     {isSessionLoading ? <div>Loading</div> : (
       <>
        {!isLoggedIn ? <>
            Not signed in <br />
            <button onClick={signIn}>Sign in</button>
          </> :
          <>
            Signed in as {userDisplayName} <br />
            <button onClick={signOut}>Sign out</button>
           </>}
       </>
     )}
   </Layout>);
}

export default LoginPage;