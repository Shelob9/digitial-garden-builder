import * as React from 'react'
//import { render } from '@testing-library/react'
import noteLayoutReducer from '../components/noteLayoutReducer'
describe('noteReducer', () => {
	test('Expands note', () => {
		expect(
			noteLayoutReducer(
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
			noteLayoutReducer(
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
	test('Adds note to empty slot', () => {
		expect(
			noteLayoutReducer(
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
					type: 'addNote',
					notePosition: 'three',
					noteId: 5,
				}
			).three
		).toEqual({
			noteId: 5,
			open: true,
		})
	})

	test('Adds note replaces note slot', () => {
		expect(
			noteLayoutReducer(
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
					type: 'addNote',
					notePosition: 'two',
					noteId: 5,
				}
			).two
		).toEqual({
			noteId: 5,
			open: true,
		})
	})

	test('Removes note', () => {
		const state = noteLayoutReducer(
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
				type: 'removeNote',
				notePosition: 'two',
			}
		)
		expect(state.hasOwnProperty('two')).toEqual(false)
	})
})
