import { useMemo } from 'react'

export const useGraphData = ({ data }) => {
	const [nodesData, linksData] = useMemo(() => {
		const nodesData = []
		const linksData = []

		const textColor =
			typeof document !== 'undefined'
				? getComputedStyle(document.body)
						.getPropertyValue('--text')
						.trim()
				: '#1a202c'
		const linkColor =
			typeof document !== 'undefined'
				? getComputedStyle(document.body)
						.getPropertyValue('--link')
						.trim()
				: '#3182ce'

		data.allFile.nodes.forEach((node) => {
			if (!node.fields || !node.fields.slug) {
				return
			}

			const nodeIndex = 1
			nodesData.push({
				id: node.id,
				label: node.fields.title,
				slug: node.fields.slug,
				color: textColor,
			})

			node.childMdx.outboundReferences.forEach((x) =>
				linksData.push({ source: node.id, target: x.parent.id })
			)
		})

		return [nodesData, linksData]
	}, [data])

	return [nodesData, linksData]
}
