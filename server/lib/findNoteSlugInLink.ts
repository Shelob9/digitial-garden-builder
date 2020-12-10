const findNoteSlugInLink = (href: string) => {
	let internal = href.startsWith('/notes/')
	if (!internal) {
		return false
	}
	let slug = href.substr('/notes/'.length)
	return slug
}

export default findNoteSlugInLink
