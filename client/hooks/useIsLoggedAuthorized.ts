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
		if (!token) {
			return
		}
		fetch('https://garden-server.vercel.app/api/session', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				Authorization: token,
			},
		})
			.then((r) => r.json())
			.then((r) => {
				console.log(r)
				if (r.session) {
					setIsLoggedIn(true)
				} else {
					setIsLoggedIn(false)
				}
				if (r.session.name) {
					setUserDisplayName(r.session.name)
				} else {
					setUserDisplayName('Roy')
				}
				setLoading(false)
			})
	}, [token])

	return {
		isLoggedIn,
		userDisplayName,
		isSessionLoading: loading,
	}
}

export default useIsLoggedInAuthorized
