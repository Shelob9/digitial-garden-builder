import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'
import toc from 'remark-toc';
import ReferencesBlock from "./references-block";
import { FC, useMemo } from 'react';
import useNotes, { useSingleNote } from './useNotes';
import NoteLink from './NoteLink';
import useNoteLayout from './useNoteLayout';
import { notePostions } from './noteLayoutReducer';
import Link from 'next/link'
export interface INote {
	id: number;
	title: string;
	content: string;
	slug: string;
	references?: [
		{noteId:number}
	]
  }

const NoteMarkdownLink: FC<{ href: string; children: any, openPosition: notePostions }> = ({
	href,
	children,
	openPosition
}) => {
	let internal = href.startsWith('/notes/');
	let slug = href.substr('/notes/'.length);
	const note = useSingleNote({slug})
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
	a = a ? a : ({ href, children }) => <a href={href}>{children}</a>
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
					.use(toc)
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
	const note = useSingleNote({ note: props.note, slug });
	const { focusNote,setFocusNote} = useNoteLayout();

	let noteReferences = useMemo(() => {
		return [];
	}, [note]);
	
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
						<Link
							href={ isLoggedIn ? `/notes/edit?noteId=${note.id}` : '/login' }
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
							<ReferencesBlock references={noteReferences}/>  
						</>
                </div>
                }
            </div>
            <style jsx>{`
				.note-container {
					background: var(--note-bg);
					transition: background 0.3s ease;
				}

				.note-container:first-child {
					border-left: none;
				}

				.note-container .note-content,
				.note-container .obstructed-label {
					transition: opacity 75ms linear;
				}

				.note-container .obstructed-label {
					display: block;
					color: var(--text);
					text-decoration: none;
					font-size: 17px;
					line-height: 40px;
					font-weight: 500;
					writing-mode: vertical-lr;
					margin-top: 36px;
					top: 0px;
					bottom: 0px;
					left: 0px;
					position: absolute;
					background-color: transparent;
					width: 40px;
					overflow: hidden;
					opacity: 0;
					transition: color 0.3s ease;
					pointer-events: none;
				}

				.note-container.note-container-highlighted {
					background: var(--references-bg);
					transition: background 0.3s ease;
				}

				.note-content img {
					max-width: 100%;
				}

				@media screen and (max-width: 800px) {
					.note-container {
						padding: 16px;
						width: 100%;
						overflow-y: auto;
					}
				}

				@media screen and (min-width: 801px) {
					.note-container {
						transition: box-shadow 100ms linear, opacity 75ms linear,
							transform 200ms cubic-bezier(0.19, 1, 0.22, 1);
						flex-shrink: 0;
						width: 625px;
						max-width: 625px;
						top: 0px;
						position: sticky;
						flex-grow: 1;
						border-left: 1px solid var(--separator);
						padding: 0;
					}

					.note-content {
						overflow-y: auto;
						height: 100%;
						padding: 32px;
					}

					.note-container-overlay {
						box-shadow: 0px 0px 15px 3px var(--shadow);
					}

					.note-container-obstructed .note-content {
						opacity: 0;
					}
					.note-container-obstructed .obstructed-label {
						opacity: 1;
						pointer-events: all;
					}
				}

				.note-closed {
					width: 25px;
					max-width: 50px;
				}

				.note-focus {
					border: 1px solid var(--text);
					background-color: var(--shadow)
				}

				.note-buttons {
					float: right;
					padding-bottom: 6px;
					border-bottom: 1px solid black;
				}
				
				.note-buttons button, .note-buttons a {
					border: 2px solid black;
					color: black;
					padding:2px;
					margin:4px;
					background-color:white;
					min-width: 30px;
				}
            `}</style>
        </>
    )
}

export default Note