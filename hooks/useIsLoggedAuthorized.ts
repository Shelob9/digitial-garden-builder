import { useMemo, useState, useEffect } from 'react'
import useUserCookie from './useUserCookie'

const useIsLoggedInAuthorized = () => {
	let [loading, setLoading] = useState(true)
	let [isLoggedIn, setIsLoggedIn] = useState(true)
	const { token } = useUserCookie({})
	let [userDisplayName, setUserDisplayName] = useState<string | undefined>(
		undefined
	)

	useEffect(() => {
		fetch('/api/auth/session', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				Authorization: token,
			},
		})
			.then((r) => r.json())
			.then((r) => {
				if (r.session) {
					setIsLoggedIn(true)
				} else {
					setIsLoggedIn(false)
				}
				if (r.name) {
					setUserDisplayName(r.name)
				} else {
					setUserDisplayName(undefined)
				}
				setLoading(false)
			})
	}, [])

	return {
		isLoggedIn,
		userDisplayName,
		isSessionLoading: loading,
	}
}

export default useIsLoggedInAuthorized
