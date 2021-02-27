import { gitRepoDetails } from './../../types/git'
import { getAccessTokenFromSession } from './UserService'
import { NextApiRequest } from 'next'
import ConfigApiService from './ConfigApiService'
import { GitApi } from '@joshpress/git-cms'
import NotesApiService from './NotesApiService'
import getSession from '../lib/getSession'
import { userJwtData } from '../../types/user'
import getRepoFromHeader from '../lib/getRepoFromHeader'
import GardenerService from './GardenerService'

const clientFactory = (authToken: string, repo: gitRepoDetails) => {
	return GitApi(repo, 'main', authToken)
}

export const noteApiServicefactoryFromRequest = async (
	req: NextApiRequest,
	repo: gitRepoDetails
): Promise<NotesApiService> => {
	return new Promise(async (resolve, reject) => {
		let session = getSession(req)
		if (session) {
			let accessToken = getAccessTokenFromSession(session)
			if (accessToken) {
				let noteService = await noteApiServicefactory(accessToken, repo)
				return resolve(noteService)
			}
		}
		reject()
	})
}
export const noteApiServicefactory = async (
	authToken: string | undefined,
	repo: gitRepoDetails
): Promise<NotesApiService> => {
	authToken = authToken ?? process.env.GITHUB_API_TOKEN
	let noteService = new NotesApiService(clientFactory(authToken, repo))
	await noteService.fetchNoteIndex()
	return noteService
}

export const settingsApiServiceFactory = async (
	authToken: string,
	repo: gitRepoDetails
): Promise<ConfigApiService> => {
	let service = new ConfigApiService(clientFactory(authToken, repo))
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
	let gardener = new GardenerService()
	return new Promise(async (resolve, reject) => {
		let garden = await getRepoFromHeader(req, gardener).catch(() => {
			reject({ message: 'Garden not found' })
		})
		if (!garden) {
			reject({ message: 'Garden not found' })
		}
		//@ts-ignore
		let repo = garden.repo
		let noteService: NotesApiService = session
			? await noteApiServicefactoryFromRequest(req, repo)
			: await noteApiServicefactory(undefined, repo)

		let accessToken = session ? getAccessTokenFromSession(session) : false
		if (!accessToken) {
			accessToken = process.env.GITHUB_API_TOKEN
		}
		let configService = await settingsApiServiceFactory(accessToken, repo)
		resolve({ noteService, configService, session })
	})
}
