import { encrypt } from '@digital-garden-builder/git-cms'
import {
	userFromGithub,
	encodeUserJwt,
	decodeUserJwt,
	getAccessTokenFromSession,
	decryptSession,
} from '../services/UserService'

describe('user functions', () => {
	const data = {
		login: 'Shelob9',
		id: 1994311,
		avatar_url: 'https://avatars0.githubusercontent.com/u/1994311?v=4',
		email: 'green@catctus.plants',
	}
	const repo = {
		owner: 'magic',
		repo: 'post-its',
	}

	test('user from github', () => {
		let user = userFromGithub(data)
		expect(user.email).toBe('green@catctus.plants')
		expect(user.providers[0]).toEqual({ type: 'github', id: data.id })
	})

	test('encode and decode user', () => {
		const name = 'The Dude'
		const accessToken = '123456secret'

		expect(decodeUserJwt(encodeUserJwt(name, accessToken, repo))).toEqual({
			name,
			accessToken,
			repo,
		})
	})
	test('decrypts session', () => {
		let accessToken = 'fja1adh'
		expect(
			decryptSession({
				name: 'Trover DuChamps',
				session: encrypt(JSON.stringify({ accessToken, repo })),
			})
		).toEqual({ name: 'Trover DuChamps', accessToken, repo })
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
