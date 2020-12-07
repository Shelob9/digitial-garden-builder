import * as React from 'react'
//import { render } from '@testing-library/react'
import noteLayoutReducer from '../components/noteLayoutReducer'
describe('noteReducer', () => {
	test('Expands note', () => {
		expect(
			noteLayoutReducer(
				{
					one: {
						noteSlug: 'one',
						open: true,
					},
					two: {
						noteSlug: 'two',
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
						noteSlug: 'one',
						open: true,
					},
					two: {
						noteSlug: 'two',
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
						noteSlug: 'one',
						open: true,
					},
					two: {
						noteSlug: 'two',
						open: false,
					},
				},
				{
					type: 'addNote',
					notePosition: 'three',
					noteSlug: 'five',
				}
			).three
		).toEqual({
			noteSlug: 'five',
			open: true,
		})
	})

	test('Adds note replaces note slot', () => {
		expect(
			noteLayoutReducer(
				{
					one: {
						noteSlug: 'one',
						open: true,
					},
					two: {
						noteSlug: 'two',
						open: false,
					},
				},
				{
					type: 'addNote',
					notePosition: 'two',
					noteSlug: 'five',
				}
			).two
		).toEqual({
			noteSlug: 'five',
			open: true,
		})
	})

	test('Removes note', () => {
		const state = noteLayoutReducer(
			{
				one: {
					noteSlug: 'one',
					open: true,
				},
				two: {
					noteSlug: 'two',
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
