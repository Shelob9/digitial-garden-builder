import useIsLoggedAuthorized from "hooks/useIsLoggedAuthorized";
import { useEffect } from "react";
const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
const state = encodeURIComponent(process.env.NEXT_PUBLIC_CLIENT_LOGIN_REDIRECT)

const loginLink = `https://github.com/login/oauth/authorize?client_id=${clientId}&state=${state}`;
export default function Login() {
    let { isLoggedIn } = useIsLoggedAuthorized();
    return (<div>
        <p>{isLoggedIn ? 'Logged In' : 'Not Logged In'}</p>
        <a href={loginLink}>Login With Github</a>
    </div>)
};
