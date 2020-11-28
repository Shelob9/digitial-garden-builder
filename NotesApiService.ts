import GitApi from './lib/GitApi'
import NoteService from './NoteService'

type noteIndexItem = {
	slug: string
	path: string
	name: string
	apiUrl: string
	url: string
}

type noteIndex = noteIndexItem[]
class NotesApiService {
	noteService: NoteService
	client
	noteIndex: noteIndex
	constructor(client) {
		this.noteService = new NoteService()
		this.client = client
	}

	fetchNoteIndex = async () => {
		return this.client.getFiles('/notes', 'md').then((r) => {
			this.noteIndex = r.map((file) => {
				let { path, name } = file
				let slug = path.replace('.md', '')
				return {
					slug,
					path,
					name,
					url: `/notes/${path}`,
					apiUrl: `/api/notes/${path}`,
				}
			})
			return this.noteIndex
		})
	}
}

export default NotesApiService
