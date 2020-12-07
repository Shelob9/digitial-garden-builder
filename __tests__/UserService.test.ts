import { userFromGithub } from '../UserService'

describe('user factory', () => {
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
})
