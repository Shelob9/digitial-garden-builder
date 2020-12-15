import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { useMemo, useEffect } from 'react'
const useUserToken = (props: { token?: string }) => {
	const [cookies, setCookie] = useCookies(['_garden_token'])
	useEffect(() => {
		if (props.token) {
			setCookie('_garden_token', props.token, { path: '/' })
		}
	}, [cookies])

	const removeCookie = () => {
		setCookie('_garden_token', undefined, {
			path: '/',
			expires: new Date(3),
		})
	}
	let token = useMemo(() => cookies._garden_token || undefined, [cookies])
	return { token, removeCookie }
}

export default useUserToken
