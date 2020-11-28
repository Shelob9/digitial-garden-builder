
import { signIn, signOut, useSession } from 'next-auth/client'
import Layout from '../components/Layout';

 function LoginPage() {
  const [ session, loading ] = useSession()
   
  return <Layout pageDisplayTitle={'Login'}>
    {!session && <>
      Not signed in <br/>
      <button onClick={signIn}>Sign in</button>
    </>}
    {session && <>
      Signed in as {session.user.name} <br/>
      <button onClick={signOut}>Sign out</button>
    </>}
  </Layout>
}

export default LoginPage;