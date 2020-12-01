import { noteApiServicefactory } from './../../../serviceFactories'
import { getSession } from 'next-auth/client'
import { NextApiResponse } from 'next'
import { NextApiRequest } from 'next'
import GitApi from '../../../lib/GitApi'
import NotesApiService from '../../../NotesApiService'
export default async (req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Cache-Control', 's-maxage=86400')
	const { slug } = req.query
	const session = await getSession({ req })
	let noteService = await noteApiServicefactory(
		session && session.authToken ? session.authToken : null
	)
	await noteService.fetchNoteIndex()
	let note = await noteService.fetchNote(slug as string)
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Cache-Control', 's-maxage=3600')
	res.status(200).json({ note })
}
