import { useEffect } from "react";
import useIsLoggedInAuthorized from "../hooks/useIsLoggedAuthorized"
import useUserCookie from "../hooks/useUserCookie"

export default function Hi({name}) {
    const { isLoggedIn, userDisplayName, isSessionLoading } = useIsLoggedInAuthorized();
    const { token } = useUserCookie({})

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_GARDEN_SERVER_URL}/api/notes`, {
            headers: {
                Authorization:token
            }
        }).then(r => r.json())
            .then( r => console.log(r))
        .catch(e => console.log(e))
      })
    return <div>
        {isSessionLoading ? <div>Loading</div> : <>
             <p>Hi {isLoggedIn ? userDisplayName : 'Roy'}</p>
        </>}
    </div>
}

