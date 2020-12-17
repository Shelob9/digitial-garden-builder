import { INote, noteIndex, noteIndexItem } from '../../types'
//import findReferences from '../lib/findReferences'
import findTitle from '../lib/findTitle'
import { IGitApi } from '../lib/GitApi'
import NoteService from './NoteService'
import findReferences from '../lib/findReferences'
const fm = require('front-matter')

const maybeUpdateTitle = (content: string) => {
	let title = findTitle(content)
	if (title) {
		content = content.replace(title.match, `# ${title.title}`)
	}
	return content
}
/**
 * API client for garden notes.
 */
class NotesApiService {
	noteService: NoteService
	client: IGitApi
	noteIndex: noteIndex
	constructor(client: IGitApi) {
		this.noteService = new NoteService()
		this.client = client
	}

	findNoteInIndex = (slug: string) => {
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
					url: `/notes/${slug}`,
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
			let title = matter.attributes.title

			let references = findReferences(content, this.noteIndex)

			let note: INote = {
				title,
				content: matter.body,
				slug,
				references,
			}
			let noteIndexItem: noteIndexItem = {
				slug,
				name: title,
				path: `/notes/${slug}.md`,
				url: `/notes/${slug}`,
				apiUrl: `notes/api/${slug}`,
			}
			let update: noteIndex = this.noteService.getNotes()
			update.push(noteIndexItem)
			this.noteService.setNotes(update as noteIndex)
			return note
		})
	}

	saveNote = async (note: INote) => {
		let nI = this.findNoteInIndex(note.slug)
		let mattterString = `---\ntitle: ${note.title} \nslug: ${note.slug}\n---\n`
		note.content = maybeUpdateTitle(note.content)
		return await this.client.saveFile(
			`${mattterString} ${note.content}`,
			nI.path,
			`Update ${note.title}`
		)
	}

	createNote = async (note: INote) => {
		let mattterString = `---\ntitle: ${note.title} \nslug: ${note.slug}\n---\n`
		note.content = maybeUpdateTitle(note.content)
		let commitSha = await this.client.saveFile(
			`${mattterString} ${note.content}`,
			`notes/${note.slug}.md`,
			`Create ${note.title}`
		)
		return { note, commitSha }
	}
}

export default NotesApiService
