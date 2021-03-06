import getSession from '../../../lib/getSession'
import { INote } from './../../../../types'
import factory from '../../../services/serviceFactories'
import { NextApiResponse } from 'next'
import { NextApiRequest } from 'next'
import createCorsMiddleWare from '../../../lib/createCorsMiddleWare'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const cors = createCorsMiddleWare(['GET', 'OPTIONS'])
	await cors(req, res)
	let session = getSession(req)
	try {
		let { noteService } = await factory(req)
		let note: INote
		await noteService.fetchNoteIndex()
		switch (req.method) {
			case 'POST':
				if (!session) {
					return res.status(203).json({ allowed: false })
				}
				note = req.body.note
				let { commitSha } = await noteService.saveNote(note)
				return res.status(201).json({ note, commitSha })
				break
			case 'GET':
			default:
				let { slug } = req.query
				note = await noteService.fetchNote(slug as string)
				res.setHeader('Cache-Control', 's-maxage=599')
				return res.status(200).json({ note })
		}
	} catch (error) {
		return res.status(403).json({ error })
	}
}
