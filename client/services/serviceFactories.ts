import { userJwtData } from './UserService'
import { NextApiRequest } from 'next'
import ConfigApiService from './ConfigApiService'
import GitApi from '../lib/GitApi'
import NotesApiService from './NotesApiService'
import getSession from '../lib/getSession'
import { getAccessTokenFromSession } from 'services/UserService'

let repo = { owner: process.env.REPO_OWNER, repo: process.env.REPO_NAME }

const clientFactory = (authToken: string) => {
	return GitApi(repo, 'main', authToken)
}

export const noteApiServicefactoryFromRequest = async (
	req: NextApiRequest
): Promise<NotesApiService> => {
	return new Promise(async (resolve, reject) => {
		let session = getSession(req)
		if (session) {
			let accessToken = getAccessTokenFromSession(session)
			if (accessToken) {
				let noteService = await noteApiServicefactory(accessToken)
				return resolve(noteService)
			}
		}
		reject()
	})
}
export const noteApiServicefactory = async (
	authToken?: string
): Promise<NotesApiService> => {
	//authToken = process.env.GITHUB_API_TOKEN
	let noteService = new NotesApiService(clientFactory(authToken))
	await noteService.fetchNoteIndex()
	return noteService
}

export const settingsApiServiceFactory = async (
	authToken: string
): Promise<ConfigApiService> => {
	let service = new ConfigApiService(clientFactory(authToken))
	await service.fetchConfig()
	return service
}

/**
 * Default factory to create both services from a request
 */
export default async function factory(
	req: NextApiRequest
): Promise<{
	noteService: NotesApiService
	configService: ConfigApiService
	session: userJwtData | false
}> {
	let session = getSession(req)
	return new Promise(async (resolve, reject) => {
		let noteService: NotesApiService = session
			? await noteApiServicefactoryFromRequest(req)
			: await noteApiServicefactory()

		let accessToken = session ? getAccessTokenFromSession(session) : false
		if (!accessToken) {
			accessToken = process.env.GITHUB_API_TOKEN
		}
		let configService = await settingsApiServiceFactory(accessToken)
		resolve({ noteService, configService, session })
	})
}
