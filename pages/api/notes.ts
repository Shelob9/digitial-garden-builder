import { INote } from './../../components/Note'
import { getSession } from 'next-auth/client'
import { NextApiRequest, NextApiResponse } from 'next'
import NoteService from '../../NoteService'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Cache-Control', 's-maxage=86400')
	let notes = new NoteService().getNotes()
	res.status(200).json(notes)
}
