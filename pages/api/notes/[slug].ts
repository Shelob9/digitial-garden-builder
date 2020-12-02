import { INote } from './../../../components/Note'
import { noteApiServicefactory } from './../../../serviceFactories'
import { getSession } from 'next-auth/client'
import { NextApiResponse } from 'next'
import { NextApiRequest } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Cache-Control', 's-maxage=86400')
	const session = await getSession({ req })
	let noteService = await noteApiServicefactory(
		session && session.authToken ? session.authToken : null
	)
	let note: INote
	await noteService.fetchNoteIndex()
	switch (req.method) {
		case 'POST':
			note = req.body.note

			let { commitSha } = await noteService.saveNote(note)
			res.status(201).json({ note, commitSha })
		case 'GET':
		default:
			let { slug } = req.query

			note = await noteService.fetchNote(slug as string)
			res.setHeader('Cache-Control', 's-maxage=3600')
			res.status(200).json({ note })
			break
	}
}
