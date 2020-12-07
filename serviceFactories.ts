import ConfigApiService from './ConfigApiService'
import GitApi from './lib/GitApi'
import NotesApiService from './NotesApiService'

let repo = { owner: 'shelob9', repo: 'garden-cms-test-data' }

const clientFactory = (authToken: string) => {
	return GitApi(repo, 'main', authToken)
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
