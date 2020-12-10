import { match } from 'assert'

export default function findTitle(
	content: string
): { title: string; match: string } | void {
	let matches = content.match(/\#(.*?)\n/g)
	if (matches && matches.length) {
		return { title: matches[0].replace('#', ''), match: matches[0] }
	}
}
