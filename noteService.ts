import { INote } from './components/Note'

let notes: INote[] = [
	{
		id: 1,
		content:
			'# Hi Roy \n One **One** [two](/notes/two) \n ## H2 \n Arms \n ## H22 \n a \n [external](https://hiroy.club)',
		title: 'Note One ',
		slug: 'one',
		references: [
			{
				noteId: 2,
			},
		],
	},
	{
		id: 2,
		slug: 'two',
		content: '# Roots \n Two **One** \n [three](/notes/three)',
		title: 'Note Two',
	},
	{
		id: 3,
		slug: 'three',
		content: 'Note Three [four](/notes/four)',
		title: 'Three',
	},
	{
		id: 4,
		slug: 'four',
		content: 'Four [three](/notes/three)',
		title: 'Note Four',
	},
]
class NoteService {
	notes: INote[]

	constructor() {
		this.notes = notes
	}

	setNotes = (notes: INote[]) => {
		this.notes = notes
	}
	getNotes = (): INote[] => {
		return this.notes
	}

	getNoteBySlug = (slug: string): INote | undefined => {
		return this.notes.find((note) => slug === note.slug)
	}

	getNoteById = (noteId: number): INote | undefined => {
		return this.notes.find((note) => noteId === note.id)
	}
}

export default NoteService
