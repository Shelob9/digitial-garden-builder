import useIsLoggedInAuthorized from 'hooks/useIsLoggedAuthorized';
import Link from 'next/link';
import { FC, useState } from 'react';
import Header from './Header';
import { A, Box, Heading, P } from './primatives/layout';
import { useNoteSettings } from './useNotes';
type linksList = { href: string; label: string; hoverText: string }[]
const links: linksList = [
	{
		href: '/notes',
		label: 'Notes',
		hoverText: 'In progress notes',
	},
	{ href: '/clippings', label: 'Clippings', hoverText:  'quotes and hyperlinks' },
	
]

const Menu: React.FC<{ className?: string; withHover?: boolean, }> = ({
	className,
	withHover,
}) => {
	const [hovered, setHovered] = useState<string>('')
	const theHoveredLink = links.find((l) => l.href === hovered)

	return (
		<nav className={className}>
			<ul className="list-reset lg:flex justify-start items-center">
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
const Footer = () => {
  const { userDisplayName } = useIsLoggedInAuthorized();
  const { authorName, authorTwitter, } = useNoteSettings();
  return (
    <footer className="bg-white dark:bg-gray-300 border-t border-gray-500 shadow">
		<div className="container mx-auto flex py-8">
			<div className="w-full mx-auto flex flex-wrap">
				<Box as={'aside'} className="flex w-full lg:w-1/2 ">
					<Box className="px-8">
						<Heading level={3} className="font-bold text-gray-900">
							<Link href={'/about'}>
								<a>About</a>
							</Link>
              </Heading>
              
						<P className="py-4 text-gray-600 text-sm">
            By {authorName}. Built with <A href={'https://digitalgardenbuilder.app/'}>Digital Garden Builder</A>
						</P>
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
							<li>
								<a
									className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:underline py-1"
									href={`https://twitter.com/${authorTwitter}`}
								>
									Twitter
								</a>
							</li>
						</ul>
					</Box>
				</Box>
				<Box
					as={'aside'}
					className="flex w-full lg:justify-end lg:text-right"
				>
				
				</Box>
			</div>
		</div>
	</footer>
  );
}
const Layout: FC<{
  BeforeControls?: () => JSX.Element;
  pageDisplayTitle?: string;
  children: any;
    FirstControl?: () => JSX.Element;

}> = ({ children, BeforeControls,pageDisplayTitle,FirstControl}) => {
  return (
      <>
		<div className="layout">
			<>
				<Header
					BeforeControls={BeforeControls}
					FirstControl={FirstControl}
					pageDisplayTitle={pageDisplayTitle ?? 'Digital Gardens' }
				/>
				{children}
				<Footer />
			</>
		</div>
      </>
      
    )
}
  
export default Layout;