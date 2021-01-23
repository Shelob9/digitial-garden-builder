const retext = require('retext')
const pos = require('retext-pos')
const keywords = require('retext-keywords')
const toString = require('nlcst-to-string')

function stringify(value) {
	return toString(value)
}
export interface ExtractedKeywords {
	keywords: string[]
	phrases: string[]
}
const processKeywords = async (text: string): Promise<ExtractedKeywords> => {
	return new Promise(async (resolve, reject) => {
		retext()
			.use(pos)
			.use(keywords)
			.process(text, (err, file) => {
				if (err) {
					reject(err)
				}
				let data = {
					keywords: [],
					phrases: [],
				}

				file.data.keywords.forEach(function (keyword) {
					data.keywords.push(toString(keyword.matches[0].node))
				})

				file.data.keyphrases.forEach(function (phrase) {
					phrase.matches[0].nodes.forEach((value) => {
						value = stringify(value)
						if (value && value.length) {
							data.phrases.push(value)
						}
					})
				})
				resolve(data)
			})
	})
}

export default processKeywords
