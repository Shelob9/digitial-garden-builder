import { factory } from '@garden-cms/note-api'
import { NextApiRequest, NextApiResponse } from 'next'
import createCorsMiddleWare from '../../lib/createCorsMiddleWare'
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const cors = createCorsMiddleWare(['GET', 'PUT', 'OPTIONS'])
	await cors(req, res)
	let { noteService, session } = await factory(req)
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
