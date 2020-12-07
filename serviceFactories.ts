import ConfigApiService from './ConfigApiService'
import GitApi from './lib/GitApi'
import NotesApiService from './NotesApiService'

let repo = { owner: 'shelob9', repo: 'garden-cms-test-data' }

const clientFactory = (authToken: string) => {
	return GitApi(repo, 'main', authToken)
}
let aT = '539942d9fc1deae084cc022146c1fbf40705bb0d'
export const noteApiServicefactory = async (
	authToken?: string
): Promise<NotesApiService> => {
	authToken = process.env.GITHUB_API_TOKEN
	let noteService = new NotesApiService(clientFactory(aT))
	await noteService.fetchNoteIndex()
	return noteService
}

export const settingsApiServiceFactory = async (
	authToken: string
): Promise<ConfigApiService> => {
	authToken = process.env.GITHUB_API_TOKEN

	let service = new ConfigApiService(clientFactory(aT))
	await service.fetchConfig()
	return service
}
