import React, { createElement, CSSProperties } from 'react'
import Link from 'next/link'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

export const Box: React.FC<{
	as?: string
	className?: string
	children: any
	style?: any | CSSProperties
	id?: string
}> = ({ as, children, className, style, id }) => {
	return createElement(as ? as : 'div', { className, style, id }, children)
}

export const Quote: React.FC<{
	children: any
	cite: string
	RenderCite?: () => JSX.Element
	citeHref?: string
}> = ({ children, cite, citeHref, RenderCite }) => {
	return (
		<Box as={'blockquote'}>
			<Box as={'div'}>{children}</Box>
			{!RenderCite ? (
				<Box as={'cite'}>
					{citeHref ? <a href={citeHref}>{cite}</a> : <>{cite}</>}
				</Box>
			) : (
				<RenderCite />
			)}
		</Box>
	)
}

export const Tabbed: React.FC<{
	tabs: { title: string; key: string; Render: () => JSX.Element }[]
}> = ({ tabs }) => {
	return (
		<Tabs>
			<TabList className={'list-none'}>
				{tabs.map(({ title, key }) => {
					return <Tab key={key}>{title}</Tab>
				})}
			</TabList>
			{tabs.map(({ Render, key }) => {
				return (
					<TabPanel key={key}>
						<Render />
					</TabPanel>
				)
			})}
		</Tabs>
	)
}

export const Button: React.FC<{
	outline?: boolean
	onClick?: () => void
	variant?: 'primary' | 'seconday' | 'default' | 'dark' | 'error'
	children: any
	className?: string
	title?: string
}> = ({ outline, children, onClick, variant, title }) => {
	let className = variant ? variant : ''

	className = outline
		? `${className} ${variant} outline dark:text-white`
		: 'outline dark:text-white m'
	return (
		<button
			className={className}
			onClick={(e) => {
				if (onClick) {
					e.preventDefault()
					onClick()
				}
			}}
			title={title}
		>
			{children}
		</button>
	)
}

export const Heading: React.FC<{
	level?: number
	children: any
	className?: string
}> = ({ level, children, className }) => {
	return createElement(`h${level ? level : 2}`, { className }, children)
}

export const NavLink: React.FC<{
	children: any
	href: string
	className?: string
}> = ({ children, href, className }) => {
	return (
		<A
			className={className ? `${className} nav-item` : 'nav-item'}
			href={href}
		>
			{children}
		</A>
	)
}

export const P: React.FC<{
	children: any
	className?: string
}> = ({ children, className }) => {
	return (
		<Box as={'p'} className={className}>
			{children}
		</Box>
	)
}

export const Div: React.FC<{
	children: any
	className?: string
	style?: any | CSSProperties
}> = ({ children, className, style }) => {
	return (
		<Box as={'div'} className={className} style={style}>
			{children}
		</Box>
	)
    }

export const A: React.FC<{
	children: any
	href: string
	className?: string
}> = ({ children, href, className }) => {
	if (href.startsWith('http')) {
		return (
			<a
				className={className}
				href={href}
				target="_blank"
				rel="noopener noreferrer"
			>
				{children}
			</a>
		)
	}
	return (
		<Link href={href}>
			<a className={className}>{children}</a>
		</Link>
	)
}

export const Divider = () => {
	return <hr />
}

export const Section = (props) => (
	<Box as={'section'} {...props}>
		{props.children}
	</Box>
)

export const Input = (props) => {
	return <input {...props} />
}

export const Label = (props) => (
	<Box as={'label'} {...props}>
		{props.children}
	</Box>
)

export const Grid: React.FC<{ children: any; className?: string }> = ({
	children,
	className,
}) => (
	<Box as={'div'} className={`flex mb-4 ${className}`}>
		{children}
	</Box>
)

export const Column: React.FC<{
	children: any
	width: '1/3' | '1/4' | '1/2' | '3/4' | '2/3' | 'full'
	className?: string
}> = ({ children, width, className }) => (
	<Box as={'div'} className={`w-${width} ${className} sm:w-full`}>
		{children}
	</Box>
)

export const Card: React.FC<{
	Content: () => JSX.Element
	title: string
	Title?: () => JSX.Element
	Footer: () => JSX.Element
	hLevel?: number
}> = ({ Content, title, Footer, hLevel, Title }) => {
	return (
		<Box className="card">
			<header>
				{Title ? (
					<Title />
				) : (
					<Heading level={hLevel ? hLevel : 3}>{title}</Heading>
				)}
			</header>
			<Content />
			<footer>
				<Footer />
			</footer>
		</Box>
	)
}
