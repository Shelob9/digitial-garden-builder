let defaultNote = ''
let allNotes = [
	{
		id: 1,
		content:
			'# Hi Roy \n One **One** [two](/two) \n ## H2 \n Arms \n ## H22 \n a',
		title: 'Note One ',
	},
	{
		id: 2,
		content: '# Roots \n Two **One**',
		title: 'Note Two',
	},
]

const addNoteAction = (notePosition) => {
	return {
		type: 'addNote',
		notePosition,
	}
}
const removeNoteAction = (notePosition) => {
	return {
		type: 'removeNote',
		notePosition,
	}
}

let intitalState = {
	one: {
		noteId: 1,
		open: true,
	},
	two: {
		noteId: 2,
		open: false,
	},
}

export interface NotePostion {
	noteId: number
	open: boolean
}

export type notePostions = 'one' | 'two' | 'three'
export interface NoteReducerState {
	one: NotePostion
	two?: NotePostion
	three?: NotePostion
}
type noteReducerActions =
	| {
			type: 'collapseNote'
			notePosition: notePostions
	  }
	| {
			type: 'expandNote'
			notePosition: notePostions
	  }
	| {
			type: 'addNote'
			notePosition: notePostions
			noteId: number
	  }
	| {
			type: 'removeNote'
			notePosition: notePostions
	  }
const noteLayoutReducer = (
	state: NoteReducerState,
	action: noteReducerActions
): NoteReducerState => {
	switch (action.type) {
		case 'collapseNote':
			return {
				...state,
				[action.notePosition]: {
					...state[action.notePosition],
					open: false,
				},
			}
			break
		case 'expandNote':
			return {
				...state,
				[action.notePosition]: {
					...state[action.notePosition],
					open: true,
				},
			}
			break

		case 'addNote':
			return {
				...state,
				[action.notePosition]: {
					noteId: action.noteId,
					open: true,
				},
			}
			break

		case 'removeNote':
			let _state = Object.assign({}, state)
			delete _state[action.notePosition]
			return _state
			break
		default:
			return state
			break
	}
}

export default noteLayoutReducer
