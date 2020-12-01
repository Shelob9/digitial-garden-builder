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
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Cache-Control', 's-maxage=3600')
	res.status(200).json({ noteIndex })
}
