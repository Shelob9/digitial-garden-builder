export const findWikiLinks = (content: string): string[] => {
	let matches = content.match(/\[\[(.*?)]]/g)
	if (matches && matches.length) {
		return matches.map((match) => match.replace('[[', '').replace(']]', ''))
	}
	return []
}
