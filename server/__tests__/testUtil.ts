import { noteIndexItem, INote } from './../../types'
export const noteIndexItemFactory = (slug: string): noteIndexItem => {
	return {
		slug,
		path: `/notes/${slug}.md`,
		name: `${slug}.md`,
		apiUrl: `/api/notes/${slug}`,
		url: `/notes/${slug}.md`,
	}
}
let makeTitle = (slug: string) => `${slug} TITLE`
export const noteFactory = (slug: string, content: string): INote => {
	return {
		slug,
		content,
		title: makeTitle(slug),
	}
}
