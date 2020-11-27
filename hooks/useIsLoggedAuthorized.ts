import { useMemo } from 'react'
import { useSession } from 'next-auth/client'
const useIsLoggedInAuthorized = () => {
	const [session, loading] = useSession()
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
