import { useMemo } from 'react'
const useIsLoggedInAuthorized = () => {
	const [session, loading] = [{}, false]
	let isLoggedIn = useMemo<boolean>(() => {
		if (loading || !session || !session.hasOwnProperty('user')) {
			return false
		}

		return true
	}, [session, loading])

	let userDisplayName = useMemo<string>(() => {
		if (!isLoggedIn) {
			return ''
		}
		return session.user.name
	}, [session, loading])

	return {
		isLoggedIn,
		userDisplayName,
		isSessionLoading: loading,
	}
}

export default useIsLoggedInAuthorized
