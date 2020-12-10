import useUserToken from "hooks/useUserCookie";
import { useEffect } from "react";
  
export default function Logout() {
    const { removeCookie } = useUserToken({});
    useEffect(() => {
        removeCookie();
    })
	return (<div>You Are Now Logged Out</div>)
};
