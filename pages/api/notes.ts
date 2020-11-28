import { INote } from './../../components/Note'
import { getSession } from 'next-auth/client'
import { NextApiRequest, NextApiResponse } from 'next'
import NotesApiService from '../../NotesApiService'
import GitApi from '../../lib/GitApi'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Cache-Control', 's-maxage=86400')
	const session = await getSession({ req })
	if (!session) {
		return res.status(403).json({ allowed: false })
	}
	let client = GitApi(
		{ owner: 'shelob9', repo: 'garden-cms-test-data' },
		'main',
		session.authToken
	)
	let noteService = new NotesApiService(client)
	let noteIndex = await noteService.fetchNoteIndex()
	res.status(200).json({ noteIndex })
}
