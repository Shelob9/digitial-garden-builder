import Layout from "components/Layout";
import useIsLoggedAuthorized from "hooks/useIsLoggedAuthorized";
const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID; //shouldn't need to be in client
const state = encodeURIComponent(process.env.NEXT_PUBLIC_CLIENT_LOGIN_REDIRECT)// not enough info also bad place to put it.

//Redirect should go first to server
const loginLink = `https://github.com/login/oauth/authorize?client_id=${clientId}&state=${state}`;
export default function Login() {
    let { isLoggedIn } = useIsLoggedAuthorized();
    return (
        <Layout pageDisplayTitle={'Login'}>
            <div>
                <p>{isLoggedIn ? 'Logged In' : 'Not Logged In'}</p>
                <a href={loginLink}>Login With Github</a>
                <p>Login to edit your notes or suggest changes.</p>
            </div>
            <div>
                <p>
                    Right now, this isn't going to work if you're not Josh.  
                </p>
            </div>
        </Layout>
       )
};
