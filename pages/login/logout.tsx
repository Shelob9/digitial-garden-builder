import useUserToken from "hooks/useUserCookie";
import { useEffect } from "react";

export async function getServerSideProps ({req,res,query}){
    res.setHeader('Set-Cookie', `token=undefined; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
    
    return {
      props: {
        
      }
    }
  }
  
export default function Logout() {
    const { removeCookie } = useUserToken({});
    useEffect(() => {
        removeCookie();
    })
	return (<div>You Are Now Logged Out</div>)
};
