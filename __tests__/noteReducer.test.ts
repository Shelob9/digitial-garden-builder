import * as React from 'react'
//import { render } from '@testing-library/react'
import noteReducer from '../components/noteReducer'
describe('noteReducer', () => {
	test('Expands note', () => {
		expect(
			noteReducer(
				{
					one: {
						noteId: 1,
						open: true,
					},
					two: {
						noteId: 2,
						open: false,
					},
				},
				{
					type: 'expandNote',
					notePosition: 'two',
				}
			).two.open
		).toBe(true)
	})
	test('Collapse note', () => {
		expect(
			noteReducer(
				{
					one: {
						noteId: 1,
						open: true,
					},
					two: {
						noteId: 2,
						open: false,
					},
				},
				{
					type: 'collapseNote',
					notePosition: 'one',
				}
			).one.open
		).toBe(false)
	})
})
