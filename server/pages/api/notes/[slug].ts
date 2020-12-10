import getSession from '../../../lib/getSession'
import { INote } from './../../../../types'
import factory from '../../../services/serviceFactories'
import { NextApiResponse } from 'next'
import { NextApiRequest } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Cache-Control', 's-maxage=86400')
	let session = getSession(req)
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
			res.status(201).json({ note, commitSha })
			break
		case 'GET':
		default:
			let { slug } = req.query
			note = await noteService.fetchNote(slug as string)
			res.setHeader('Cache-Control', 's-maxage=3600')
			res.status(200).json({ note })
			break
	}
}
