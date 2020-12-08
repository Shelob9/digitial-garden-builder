import { encrypt } from '../lib/encryptDecrypt'
import {
	userFromGithub,
	encodeUserJwt,
	decodeUserJwt,
	getAccessTokenFromSession,
	decryptSession,
} from '../UserService'

describe('user functions', () => {
	const data = {
		login: 'Shelob9',
		id: 1994311,
		avatar_url: 'https://avatars0.githubusercontent.com/u/1994311?v=4',
		email: 'green@catctus.plants',
	}

	test('user from github', () => {
		let user = userFromGithub(data)
		expect(user.email).toBe('green@catctus.plants')
		expect(user.providers[0]).toEqual({ type: 'github', id: data.id })
	})

	test('encode and decode user', () => {
		const name = 'The Dude'
		const accessToken = '123456secret'
		expect(decodeUserJwt(encodeUserJwt(name, accessToken))).toEqual({
			name,
			accessToken,
		})
	})
	test('decrypts session', () => {
		let accessToken = 'fja1adh'
		expect(
			decryptSession({
				name: 'Trover DuChamps',
				session: encrypt(JSON.stringify({ accessToken })),
			})
		).toEqual({ name: 'Trover DuChamps', accessToken })
	})

	test('gets accessToken from session', () => {
		let accessToken = 'aTokenFormSomething'
		expect(
			getAccessTokenFromSession({
				name: 'Trover DuChamps',
				session: encrypt(JSON.stringify({ accessToken })),
			})
		).toEqual(accessToken)
	})
})
