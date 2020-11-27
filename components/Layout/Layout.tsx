import React, { useState } from 'react'
import { Provider } from 'react-slot-fill'

import {
	P,
	Box,
	Heading,
	A,
} from './primatives'

import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { useTheme } from '../../ThemeProvider'

export type linksList = { href: string; label: string; hoverText: string }[]


const Menu: React.FC<{ className?: string; withHover?: boolean;links: linksList }> = ({
	className,
    withHover,
    links
}) => {
	const [hovered, setHovered] = useState<string>('')
	const theHoveredLink = links.find((l) => l.href === hovered)

	return (
		<nav className={className}>
			<ul className="list-reset lg:flex justify-end items-center">
				{links.map((link) => (
					<li
						key={link.href}
						className="mr-3 py-2 lg:py-0"
						onMouseEnter={() => setHovered(link.href)}
						onMouseLeave={() => setHovered('')}
					>
						<Link href={link.href}>
							<a
								className="inline-block py-2 px-4 text-gray-900 hover:text-gray-500 hover:border-gray-400 font-bold no-underline dark:text-gray-200"
								title={link.hoverText}
							>
								{link.label}
							</a>
						</Link>
					</li>
				))}
			</ul>
			{withHover && <P> {hovered && <>{theHoveredLink.hoverText}</>}</P>}
		</nav>
	)
}
const Layout = (props: {
	title: string
	displayTitle?: string
	children: any
	innerSize?: 1024 | 728 | undefined
	description?: string
	prose?: boolean
	displaySubtitle?: string
	headerLinks?:linksList
}) => {
	const {
		children,
		description,
		title,
		displayTitle,
		prose,
		displaySubtitle,
		headerLinks
	} = props
	const innerSize = props.innerSize ? props.innerSize : 728
	const { darkMode, toggleDarkMode } = useTheme()
	const [showMenu, setShowMenu] = useState(false)

	return (
		<>
			<Layout.SEO title={title} description={description} />
			<Provider>
				<Box className="min-h-screen">
					<div className={'items-center'}>
						<Layout.Header title={title} links={headerLinks} />
						<div className="container w-full flex flex-wrap mx-auto px-2 pt-8 sm:pt-4 mt-0">
							<div className="p-8 pt-2 mt-6 lg:mt-0 text-gray-900 leading-normal  border border-gray-400 border-rounded min-w-full">
								{displayTitle && (
									<div className="font-sans">
										<h1 className="font-sans break-normal text-gray-900 pt-6 pb-2 text-xl">
											{displayTitle}
										</h1>
										{displaySubtitle && (
											<P>{displaySubtitle}</P>
										)}
										<hr className="border-b border-gray-400" />
									</div>
								)}
								<main
									className={prose ? 'prose prose-2xl' : ''}
								>
									{children}
								</main>
							</div>
						</div>
					
					</div>
				</Box>
			</Provider>
		</>
	)
}

Layout.Header = (props: { title: string,links?:linksList }) => {
    
	function navToggle() {
		var btn = document.getElementById('menuBtn')
		var nav = document.getElementById('menu')
		btn.classList.toggle('open')
		nav.classList.toggle('flex')
		nav.classList.toggle('hidden')
	}
	return (
		<header
			id="top"
			className=" w-full flex flex-col fixed sm:relative bg-white pin-t pin-r pin-l"
		>
			<nav
				id="site-menu"
				className="flex flex-col sm:flex-row w-full justify-between items-center px-4 sm:px-6 py-1 bg-white shadow sm:shadow-none border-t-4 border-red-900"
			>
				<div className="w-full sm:w-auto self-start sm:self-center flex flex-row sm:flex-none flex-no-wrap justify-between items-center">
					<span className="no-underline py-1">
						<h1 className="font-bold text-lg tracking-widest">
							<img
								src={'/icons/icon-72x72.png'}
								className={'logo mr-4'}
								alt={'Logo'}
							/>
							<Link href={'/'}>
								<a className="text-gray-900 dark:text-gray-200  no-underline hover:no-underline font-extrabold text-xl lg:pl-4">
									{props.title}
								</a>
							</Link>
						</h1>
					</span>
					<button
						id="menuBtn"
						className="hamburger block sm:hidden focus:outline-none"
						type="button"
						onClick={() => navToggle()}
					>
						<span className="hamburger__top-bun"></span>
						<span className="hamburger__bottom-bun"></span>
					</button>
				</div>
				<div
					id="menu"
					className="w-full sm:w-auto self-end sm:self-center sm:flex flex-col sm:flex-row items-center h-full py-1 pb-4 sm:py-0 sm:pb-0 hidden"
				>
					{props.links && props.links.map((link) => (
						<Link key={link.href} href={link.href}>
							<a
								className="text-dark font-bold hover:text-red text-lg w-full no-underline sm:w-auto sm:pr-4 py-2 sm:py-1 sm:pt-2"
								title={link.hoverText}
							>
								{link.label}
							</a>
						</Link>
					))}
				</div>
			</nav>
		</header>
	)
}
Layout.SEO = ({ title, description }) => (
	<NextSeo title={title} description={description} />
)

Layout.Footer = (props: {
    About: () => JSX.Element,
    socialLinks?: linksList
}) => {
    const { About,socialLinks } = props;
    return (
        <footer className="bg-white dark:bg-gray-500 border-t border-gray-400 shadow">
            <div className="container mx-auto flex py-8">
                <div className="w-full mx-auto flex flex-wrap">
                    <Box as={'aside'} className="flex w-full lg:w-1/2 ">
                        <Box className="px-8">
                            <About />
                        </Box>
                    </Box>
                    <Box
                        as={'aside'}
                        className="flex w-full lg:w-1/2 lg:justify-end lg:text-right"
                    >
                        <Box className="px-8">
                            <Heading level={3} className="font-bold text-gray-900">
                                Social
						    </Heading>
                            <ul className="list-reset items-center text-sm pt-3">
                                {socialLinks && socialLinks.map(({ href, label }) => {
                                    <li key={href}>
                                        <a
                                            className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:underline py-1"
                                            href={href}
                                        >
                                            {label}
                                        </a>
                                </li>
                                })}
                            </ul>
                        </Box>
                    </Box>
                </div>
            </div>
        </footer>
    )
}

export default Layout
