import { hash } from './../server/lib/encryptDecrypt'
import { gitRepoDetails } from './../server/lib/getOctoKit'
export interface User {
	name: string
	email?: string
	avatarUrl?: string
	providers: {
		type: 'github'
		id: number | string
	}[]
}
export interface userSession {
	name: string
	accessToken: string
	repo: gitRepoDetails
}

export interface userJwtData {
	name: string
	session: hash
}
