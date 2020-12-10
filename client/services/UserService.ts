import { decrypt, encrypt, hash } from '../lib/encryptDecrypt'
import { createJwtToken, decodeJwtToken } from '../lib/jwt'
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

export const encodeUserJwt = (name: string, accessToken: string): string => {
	return createJwtToken({
		name,
		session: encrypt(JSON.stringify({ accessToken })),
	})
}

//Decrypt session object from decoded jwt
export const decryptSession = (
	decodedJwtData: userJwtData
): userSession | undefined => {
	if (decodedJwtData.name && decodedJwtData.session) {
		let session = decrypt(decodedJwtData.session)
		if (session) {
			session = JSON.parse(session)
			//@ts-ignore
			if (session.accessToken) {
				return {
					name: decodedJwtData.name,
					//@ts-ignore
					accessToken: session.accessToken,
				}
			}
		}
	}
}
export const decodeUserJwt = (token: string): userSession | undefined => {
	let decoded = decodeJwtToken(token)
	if (!decoded) {
		return undefined
	}

	return decryptSession(decoded)
}

export const getAccessTokenFromSession = (
	sessionData: userJwtData | undefined
): string | false => {
	if (!sessionData) {
		return false
	}
	let session = decryptSession(sessionData)
	if (session) {
		return session.accessToken ?? false
	}
	return false
}
