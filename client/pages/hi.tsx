import useIsLoggedInAuthorized from "../hooks/useIsLoggedAuthorized"
import getSession from "../lib/getSession";

export default function Hi({name}) {
    const { isLoggedIn } = useIsLoggedInAuthorized();
    return <div>
        Hi {name}
    </div>
}

export async function getServerSideProps({ req }) {
    const session = getSession(req);
    console.log(session);
    return {
        props: {
            name: session ? session.name : 'Roy'
        }
    }
}