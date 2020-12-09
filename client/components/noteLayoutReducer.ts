export interface NotePostion {
	noteSlug: string
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
			noteSlug: string
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
					noteSlug: action.noteSlug,
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
