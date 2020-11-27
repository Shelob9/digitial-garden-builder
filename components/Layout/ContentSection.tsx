import React from 'react'
import { Section, Box } from './primatives'
const ContentSection = (props: {
	children: any
	title: string
	hLevel?: 1 | 2 | 3 | 4
}) => {
	return (
		<Section className="text-gray-700 body-font overflow-hidden">
			<Box as={'div'}>
				<Box as={'div'}>{''}</Box>
				{React.createElement(
					`h${props.hLevel ? props.hLevel : 3}`,
					{
						className:
							'text-2xl font-medium text-gray-900 title-font mb-2',
					},
					[props.title]
				)}
				{props.children}
			</Box>
		</Section>
	)
}

export default ContentSection
