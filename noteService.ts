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
	getNotes = (): INote[] => {
		return notes
	}

	getNoteBySlug = (slug: string): INote | undefined => {
		return notes.find((note) => slug === note.slug)
	}
}

export default NoteService
