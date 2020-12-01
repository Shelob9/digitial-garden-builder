import { INote } from './components/Note'
import GitApi from './lib/GitApi'
import NoteService from './NoteService'
const fm = require('front-matter')
type noteIndexItem = {
	slug: string
	path: string
	name: string
	apiUrl: string
	url: string
}

function rand(min = 1, max = 10000) {
	let randomNum = Math.random() * (max - min) + min
	return Math.floor(randomNum)
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

	findNoteInIndex = (slug) => {
		return this.noteIndex.find((n) => n.slug === slug)
	}

	fetchNoteIndex = async () => {
		return this.client.getFiles('/notes', 'md').then((r) => {
			this.noteIndex = r.map((file) => {
				let { path, name } = file
				let slug = path.replace('.md', '').replace('notes/', '')
				return {
					slug,
					path,
					name,
					url: `/notes/${path}`,
					apiUrl: `/api/notes/${slug}`,
				}
			})
			return this.noteIndex
		})
	}

	fetchNote = async (slug: string) => {
		let path = `/notes/${slug}.md`

		return this.client.getFile(path).then(({ content }) => {
			let _note = this.findNoteInIndex(slug)
			if (!_note) {
				throw new Error('Fuck')
			}
			let matter = fm(content)
			let { title, id } = matter.attributes
			let note: INote = {
				id,
				title,
				content,
				slug: _note.slug,
			}
			this.noteService.setNotes([...this.noteService.getNotes(), note])
			return note
		})
	}
}

export default NotesApiService
