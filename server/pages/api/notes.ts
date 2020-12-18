import factory from '../../services/serviceFactories'
import { NextApiRequest, NextApiResponse } from 'next'
import createCorsMiddleWare from '../../lib/createCorsMiddleWare'
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const cors = createCorsMiddleWare(['GET', 'PUT', 'OPTIONS'])
	await cors(req, res)
	try {
		let { noteService, session } = await factory(req)
		let noteIndex = await noteService.fetchNoteIndex()
		switch (req.method) {
			case 'GET':
				res.setHeader('Cache-Control', 's-maxage=3600')
				return res.status(200).json({ noteIndex })
			case 'PUT':
				if (!session) {
					return res.status(203).json({ allowed: false })
				}
				let note = req.body.note
				let result = await noteService.createNote(note)
				return res.status(201).json({
					note: result.note,
					commitSha: result.commitSha,
				})
			default:
				return res.status(405).json({})
		}
	} catch (error) {
		return res.status(500).json({ error })
	}
}
