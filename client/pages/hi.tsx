import useIsLoggedInAuthorized from "../hooks/useIsLoggedAuthorized"

export default function Hi({name}) {
    const { isLoggedIn,userDisplayName,isSessionLoading } = useIsLoggedInAuthorized();
    return <div>
        {isSessionLoading ? <div>Loading</div> : <>
             <p>Hi {isLoggedIn ? userDisplayName : 'Roy'}</p>
        </>}
    </div>
}

