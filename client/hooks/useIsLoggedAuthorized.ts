import useGardenServer from 'hooks/useGardenServer'
import { useMemo, useState, useEffect } from 'react'
import useUserCookie from './useUserCookie'

const useIsLoggedInAuthorized = () => {
	let { createUrl } = useGardenServer({})
	let [loading, setLoading] = useState(true)
	let [isLoggedIn, setIsLoggedIn] = useState(true)
	const { token } = useUserCookie({})
	let [userDisplayName, setUserDisplayName] = useState<string | undefined>(
		undefined
	)

	useEffect(() => {
		if (!token) {
			setIsLoggedIn(false)
			setLoading(false)
			return
		}
		fetch(createUrl(`/api/session`), {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				Authorization: token,
			},
		})
			.then((r) => r.json())
			.then((r) => {
				setLoading(false)
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
			})
	}, [token])

	return {
		isLoggedIn,
		userDisplayName,
		isSessionLoading: loading,
	}
}

export default useIsLoggedInAuthorized
