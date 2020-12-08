import getSession from '../../lib/getSession'
import { getAccessTokenFromSession } from './../../lib/sessionUtil'
import {
	noteApiServicefactory,
	noteApiServicefactoryFromRequest,
} from './../../serviceFactories'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Cache-Control', 's-maxage=86400')
	let session = getSession(req)
	let noteService = await noteApiServicefactoryFromRequest(req)
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
