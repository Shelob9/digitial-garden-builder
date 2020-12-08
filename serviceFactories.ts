import { NextApiRequest } from 'next'
import ConfigApiService from './ConfigApiService'
import GitApi from './lib/GitApi'
import NotesApiService from './NotesApiService'
import { decrypt } from './lib/encryptDecrypt'
import getSession from './lib/getSession'
import { getAccessTokenFromSession } from 'UserService'
import NoteService from 'NoteService'

let repo = { owner: 'shelob9', repo: 'garden-cms-test-data' }

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
