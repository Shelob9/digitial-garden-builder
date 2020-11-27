import Link from 'next/link'
import React, { Fragment } from 'react'
import { Box, Divider, Heading } from './primatives'
export type listItem = {
	id: number | string
	date?: string
	title: string
	to: string
	content: string
}
const Div = (props) => (
	<Box as={'div'} {...props}>
		{props.children}
	</Box>
)

const Section = (props) => (
	<Box as={'section'} {...props}>
		{props.children}
	</Box>
)

export const ItemSingle = (props: { item: listItem; hLevel: number }) => {
	const { item, hLevel } = props
	const date = item.date ? new Date(item.date) : undefined

	const RenderLink = (props: { children: string }) => (
		<Fragment>
			{item.to.startsWith('http') ? (
				<a href={item.to} target="_blank" rel="noopener noreferrer">
					{props.children}
				</a>
			) : (
				<Link href={item.to}>
					<a>{props.children}</a>
				</Link>
			)}
		</Fragment>
	)

	return (
		<Div py={1} m={1} key={item.id} border={1} bg="muted">
			<Box>
				<Heading level={hLevel}>
					<RenderLink>{item.title}</RenderLink>
				</Heading>
				{date && (
					<Box>
						<span>{date.toLocaleDateString()}</span>
					</Box>
				)}
				{item.to && <RenderLink>Read More</RenderLink>}
			</Box>
			<Divider />
		</Div>
	)
}

const ItemList = (props: { items: listItem[] }) => {
	return (
		<Section>
			<div>
				<Div>
					{props.items.map((item) => {
						return (
							<ItemSingle item={item} key={item.id} hLevel={2} />
						)
					})}
				</Div>
			</div>
		</Section>
	)
}

export default ItemList
