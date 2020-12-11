import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'
import ReferencesBlock from "./ReferencesBlock";
import { FC } from 'react';
import useNotes, { useSingleNote } from './useNotes';
import NoteLink from './NoteLink';
import useNoteLayout from './useNoteLayout';
import { notePostions } from './noteLayoutReducer';
import Link from 'next/link'
const { wikiLinkPlugin } = require('remark-wiki-link');
import {INote} from '../../types'


const NoteMarkdownLink: FC<{
	href: string;
	children: any,
	openPosition: notePostions
}> = ({
	href,
	children,
	openPosition
}) => {
	let internal = href.startsWith('/notes/');
	let slug = href.substr('/notes/'.length);
	const { note } = useSingleNote({slug})
	const {
		addNote,
		removeNote,
		hasNote,
		findNotePostion,
		expandBox,
		setFocusNote
	} = useNoteLayout();
	if (internal && note) {
		const onClick = () => {
			const pos = findNotePostion(slug);
			if (pos && hasNote(pos)) {
				expandBox(pos)
				setFocusNote(pos)
			} else {
				if ("one" === openPosition) {
					removeNote(
						"one"
					);
					removeNote(
						"two"
					)
					removeNote(
						"three"
					)
				}
				addNote(
					openPosition,
					note.slug
				)
				setFocusNote(openPosition);
			}

			
		}

		return <NoteLink
				onClick={onClick}
				className={'reference'}
				slug={slug}
		>
			{children}
		</NoteLink>
	}
	return <a href={href}>{children}</a>
}

const nextPosition = (position: notePostions) => {
	switch (position) {
		case "one":
			return "two";
		case "two":
			return "three"
		case "three":
		default:
			return "one";
	}
}

export const NoteMarkdown: FC<{
	content: string;
	a?: (props: { href: string; children: any }) => JSX.Element,
}> = ({ content, a }) => {
	const { allNoteLinks } = useNotes();
	a = a ? a : ({ href, children }) => <a href={href}>{children}</a>;

	return (
		<>
			{
				unified()
					.use(parse)
					.use(remark2react,{
						remarkReactComponents: {
							a
						}
					})
					.use(wikiLinkPlugin,
						{
							permalinks: allNoteLinks,
							hrefTemplate: (permalink: string) => {
								return `/notes/${permalink}`
							}
						}
					)
					//.use(doubleBrackets)
				.processSync(content).result
			}
		</>
	)
}
const Note: FC<{
	note?: INote;
	slug: string;
	toggleBox: () => void;
	isOpen: boolean;
	position: notePostions,
	isLoggedIn: boolean;
}> = (props) => {
	const { slug,toggleBox, isOpen, position, isLoggedIn } = props;
	const { note } = useSingleNote({  slug });
	const { focusNote,setFocusNote} = useNoteLayout();
	
	if (!note) {
		return <div>Loading</div>
	}

	let { content } = note;

    return (
        <>
			<div
                className={`note-container ${isOpen ? 'note-open' : 'note-closed'} ${focusNote === position ? 'note-focus': ''}`}
			>
				<div className={'note-buttons'}>
					<button
						onClick={
						() => toggleBox()
					}>
						{isOpen ? '-' : '+'}
					</button>
					{isOpen &&
						 isLoggedIn && <Link
							href={isLoggedIn ? `/notes/edit?note=${encodeURIComponent(note.slug)}` : '/login'}
						>
							<a
								className={'edit-note'}
							>
								{'Edit'}
							</a>
						</Link>
						
					}
				</div>
                {isOpen &&
					<div
						className={"note-content"}
						onClick={() => setFocusNote(position)}
					>
						<NoteMarkdown
							content={content}
							a={(props) => (
								<NoteMarkdownLink
									{...props}
									openPosition={nextPosition(position)}
								/>)
								}
							/>
						<>
						{note.references && <ReferencesBlock references={note.references} openPosition={'one'} />}
						</>
                </div>
                }
            </div>
        </>
    )
}

export default Note