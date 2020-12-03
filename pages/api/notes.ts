import { noteApiServicefactory } from './../../serviceFactories'
import { getSession } from 'next-auth/client'
import { NextApiRequest, NextApiResponse } from 'next'
import NotesApiService from '../../NotesApiService'
import GitApi from '../../lib/GitApi'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Cache-Control', 's-maxage=86400')
	const session = await getSession({ req })
	let noteService = await noteApiServicefactory(
		session && session.authToken ? session.authToken : null
	)
	let noteIndex = await noteService.fetchNoteIndex()
	switch (req.method) {
		case 'GET':
			res.setHeader('Cache-Control', 's-maxage=3600')
			res.status(200).json({ noteIndex })
			break
		case 'PUT':
			if (!session) {
				return res.status(203).json({ allowed: false })
			}
			let note = req.body.note
			let result = await noteService.createNote(note)
			res.status(201).json({
				note: result.note,
				commitSha: result.commitSha,
			})
			break

		default:
			res.status(405).json({})
			break
	}
}
