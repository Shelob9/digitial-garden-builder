import { useMemo, useState, useEffect } from 'react'
import useUserCookie from './useUserCookie'

let gardenServerUrl =
	process.env.NEXT_PUBLIC_GARDEN_SERVER_URL ||
	'https://garden-server.vercel.app'
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
		fetch(`${gardenServerUrl}/api/session`, {
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
				if (r.user) {
					if (r.user.name) {
						setUserDisplayName(r.user.name)
					} else {
						setUserDisplayName('Roy')
					}
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
