import { GraphNode, GraphEdge } from './../../types/graphs'
import { NodeGraphData } from '../../types/graphs'
import { INote } from '../../types'
import processKeywords from './processKeywords'

type noteKeywordMap = {
	//Note Slug is index
	[key: string]: string[]
}
const processNoteKeywords = async (notes: INote[]): Promise<noteKeywordMap> => {
	return new Promise(async (resolve, reject) => {
		let processed = {}
		notes.forEach(async (note: INote) => {
			let data = await processKeywords(note.content)
			processed[note.slug] = data.keywords
		})
		resolve(processed)
	})
}

const getNoteKeywords = (noteSlug: string, keywordMap: noteKeywordMap) =>
	keywordMap[noteSlug] ?? undefined

const arrayIntersect = (array1: string[], array2: string[]) =>
	array1.filter((value) => array2.includes(value))

const hasNode = (id: string, nodes: GraphNode[]) => {
	return nodes.findIndex((n) => n.id === id) > -1
}

const noteToNode = (note: INote): GraphNode => {
	return {
		id: note.slug,
		label: note.title,
	}
}

const parseNoteKeywordMap = (
	startNote: INote,
	notes: INote[],
	keywordMap: noteKeywordMap
): NodeGraphData => {
	let graph = {
		nodes: [noteToNode(startNote)],
		links: [],
	}

	let startNoteKeywords = getNoteKeywords(startNote.slug, keywordMap)
	if (startNoteKeywords.length) {
		notes.forEach((note: INote) => {
			let { slug } = note
			if (slug === startNote.slug) {
				return
			}
			let thisNoteKeywords = getNoteKeywords(slug, keywordMap)
			if (thisNoteKeywords.length) {
				let intersect = arrayIntersect(
					startNoteKeywords,
					getNoteKeywords(slug, keywordMap)
				)
				if (intersect.length) {
					if (!hasNode(slug, graph.nodes)) {
						graph.nodes.push(noteToNode(note))
					}
					intersect.forEach((keyword: string) => {
						graph.links.push({
							source: startNote.slug,
							target: slug,
							label: keyword,
						})
					})
				}
			}
		})
	}
	return graph
}

/**
 * Get a map of keywords from one note to notes with the same keywords
 */
export default async function (
	startNote: INote,
	notes: INote[]
): Promise<NodeGraphData> {
	let keywordMap = await processNoteKeywords(notes)
	return parseNoteKeywordMap(startNote, notes, keywordMap)
}
