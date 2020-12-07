export interface User {
	name: string
	email?: string
	avatarUrl?: string
	providers: {
		type: 'github'
		id: number | string
	}[]
}

export const userFromGithub = (data: any): User => {
	return {
		name: data.name,
		email: data.email,
		avatarUrl: data.avatar_url,
		providers: [{ type: 'github', id: data.id }],
	}
}
