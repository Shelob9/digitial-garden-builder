import { NextApiRequest } from 'next'
import ConfigApiService from './ConfigApiService'
import GitApi from './lib/GitApi'
import NotesApiService from './NotesApiService'
import { decrypt } from './lib/encryptDecrypt'
import getSession from './lib/getSession'

let repo = { owner: 'shelob9', repo: 'garden-cms-test-data' }

const clientFactory = (authToken: string) => {
	return GitApi(repo, 'main', authToken)
}

export const noteApiServicefactoryFromRequest = async (req: NextApiRequest) => {
	let { name, session } = getSession(req)
	session = decrypt(session)
	if (session) {
		session = JSON.parse(session)
	}
	let noteService = await noteApiServicefactory(
		session && session.accessToken ? session.accessToken : null
	)
	return noteService
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
	authToken = process.env.GITHUB_API_TOKEN

	let service = new ConfigApiService(clientFactory(authToken))
	await service.fetchConfig()
	return service
}
