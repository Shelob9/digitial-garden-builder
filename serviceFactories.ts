import GitApi from './lib/GitApi'
import NotesApiService from './NotesApiService'

export const noteApiServicefactory = async (
	authToken?: string
): Promise<NotesApiService> => {
	authToken = authToken ?? process.env.GITHUB_API_TOKEN
	let client = GitApi(
		{ owner: 'shelob9', repo: 'garden-cms-test-data' },
		'main',
		authToken
	)
	let noteService = new NotesApiService(client)
	await noteService.fetchNoteIndex()
	return noteService
}
