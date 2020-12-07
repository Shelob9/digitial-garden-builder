import { decrypt, encrypt, hash } from './lib/encryptDecrypt'
import { createJwtToken, decodeJwtToken } from './lib/jwt'
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

export interface userSession {
	name: string
	accessToken: string
}

export interface userJwtData {
	name: string
	session: hash
}
const createUserJwtData = (name: string, accessToken: string): userJwtData => {
	return {
		name,
		session: encrypt(JSON.stringify(accessToken)),
	}
}

export const encodeUserJwt = (name: string, accessToken: string): string => {
	return createJwtToken({
		name,
		session: encrypt(JSON.stringify({ accessToken })),
	})
}

export const decodeUserJwt = (token: string): userSession | undefined => {
	let decoded = decodeJwtToken(token)
	if (!decoded) {
		return undefined
	}

	if (decoded.name && decoded.session) {
		let session = decrypt(decoded.session)
		if (session) {
			session = JSON.parse(session)
			//@ts-ignore
			if (session.accessToken) {
				return {
					name: decoded.name,
					//@ts-ignore
					accessToken: session.accessToken,
				}
			}
		}
	}
}
