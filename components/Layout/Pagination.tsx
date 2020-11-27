import React from 'react'
import Link from 'next/link'
type pageLink = {
	href: string
	label: string
}
const Pagination = (props: {
	pageLinks?: pageLink[]
	nextPage?: pageLink
	prevPage?: pageLink
}) => {
	const { pageLinks, nextPage, prevPage } = props
	return (
		<React.Fragment>
			<nav aria-label="pagination">
				<ul className="pagination">
					{prevPage && (
						<li>
							<Link href={prevPage.href}>
								<a>{prevPage.label}</a>
							</Link>
						</li>
					)}
					{pageLinks && (
						<ul>
							{pageLinks.map((pageLink) => (
								<li>
									<Link href={pageLink.href}>
										<a>{pageLink.label}</a>
									</Link>
								</li>
							))}
						</ul>
					)}
					{nextPage && (
						<li>
							<Link href={nextPage.href}>
								<a href={nextPage.href}>{nextPage.label}</a>
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</React.Fragment>
	)
}

export default Pagination
