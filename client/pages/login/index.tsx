import Layout from "components/Layout";
import useGardenServer from "hooks/useGardenServer";
import useIsLoggedAuthorized from "hooks/useIsLoggedAuthorized";

export default function Login() {
    let { loginLink} = useGardenServer({});
    let { isLoggedIn } = useIsLoggedAuthorized();
    return (
        <Layout pageDisplayTitle={'Login'}>
            <div>
                <p>{isLoggedIn ? 'Logged In' : 'Not Logged In'}</p>
                <a href={loginLink}>Login To Digital Garden Builder</a>
                <p>Login to edit your notes or suggest changes.</p>
            </div>
            <div>
                <p>
                    You must be author of site to login.  
                </p>
                <p>
                    Multi-player coming soon.  
                </p>
            </div>
        </Layout>
       )
};
