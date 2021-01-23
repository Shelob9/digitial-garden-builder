import { NextApiResponse } from 'next'
import { NextApiRequest } from 'next'
import createCorsMiddleWare from '../../../../lib/createCorsMiddleWare'
import getSession from '../../../../lib/getSession'
import factory from '../../../../services/serviceFactories'
import mapNoteKeywords from '../../../../lib/mapNoteKeywords'
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const cors = createCorsMiddleWare(['GET', 'OPTIONS'])
	await cors(req, res)
	//let session = getSession(req)
	try {
		let { noteService } = await factory(req)
		let { slug, process } = req.query
		try {
			let note = await noteService.fetchNote(slug as string)

			let notes = await noteService.fetchAllNotes()
			let keywordGraph = await mapNoteKeywords(note, notes)
			res.setHeader('Cache-Control', 's-maxage=3600')
			return { note, keywordGraph }
		} catch (error) {
			return res.status(403).json({ error })
		}
	} catch (error) {
		return res.status(403).json({ error })
	}
}
