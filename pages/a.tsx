import useIsLoggedInAuthorized from "../hooks/useIsLoggedAuthorized"

export default function A() {
    const { isLoggedIn } = useIsLoggedInAuthorized();
    return<div>a</div>
}