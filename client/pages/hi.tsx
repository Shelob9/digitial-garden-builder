import useGardenServer from "hooks/useGardenServer";
import { useEffect } from "react";
import { Tabbed } from "../components/primatives/layout";
import useIsLoggedInAuthorized from "../hooks/useIsLoggedAuthorized"
import useUserCookie from "../hooks/useUserCookie"

export default function Hi({name}) {
    const { isLoggedIn, userDisplayName, isSessionLoading } = useIsLoggedInAuthorized();
    const { createUrl,createHeaders } = useGardenServer({});
    useEffect(() => {
        fetch(createUrl(`/api/clippings`), {
            headers: createHeaders()
        }).then(r => r.json())
            .then( r => console.log(r))
        .catch(e => console.log(e))
      })
    return <div>
        {isSessionLoading ? <div>Loading</div> : <>
             <p>Hi {isLoggedIn ? userDisplayName : 'Roy'}</p>
        </>}
        <Tabbed tabs={[{ title: 'One', key: '1a', Render: () => <div>1</div> }]}/>

    </div>
}

