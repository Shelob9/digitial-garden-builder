import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'
import ReferencesBlock from "./ReferencesBlock";
import { FC } from 'react';
import useNotes, { useSingleNote } from './useNotes';
import useNoteLayout from './useNoteLayout';
import { notePostions } from './noteLayoutReducer';
import Link from 'next/link'
const { wikiLinkPlugin } = require('remark-wiki-link');
import {INote} from '../../types'
import  NoteMarkdownLink  from './NoteMarkdownLink';
import { useMemo } from 'react';


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

//Render note content, as markdwon to HTML
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

const NoteTitle: React.FC<{ note: INote,className?:string }> = ({ note,className}) => (
	<h1 className={className}>{note.title}</h1>
)


//Display one note
const Note: FC<{
	note?: INote;
	slug: string;
	toggleBox: () => void;
	isOpen: boolean;
	position: notePostions,
	isLoggedIn: boolean;
}> = (props) => {
	const { slug, toggleBox, isOpen, position, isLoggedIn } = props;
	//Even if we got a note from props, get it from network/cache
	const { note } = useSingleNote({
		slug, //note
	});
	const { focusNote, setFocusNote } = useNoteLayout();
	const outterClassName = useMemo(
		() => `note-container ${isOpen ? 'note-open' : 'note-closed'} ${focusNote === position ? 'note-focus' : ''}`,
		[focusNote, position,isOpen]
	);
	if (!note) {
		return (
			<div
				className={`${outterClassName} animate-pulse opacity-40`}
			>
				<div className={'note-buttons'}></div>
				<div
					className={"note-content h-full"}
				>
					{props.note ? (
						<>
							<NoteTitle note={props.note}
								className={'animate-pulse'}
							/>
							<NoteMarkdown
								content={props.note.content}
							/>
						</>
					) : (
							<>
								<span className="animate-pulse">Loading</span><span className="animate-ping">...</span>
							</>
					)}
					 
				</div>
			</div>
		)
	}

	const Toolbar = ({ children }) => (
		<div
			role={'toolbar'}
			aria-label={`Controls for note ${note.title}`}
			aria-controls={`note-${note.slug}`}
			className={'border border-gray-500 space-y-0 text-center flex justify-center rounded-lg text-lg mb-4'}
				
		>
			{children}
		</div>
	);
	if (!isOpen) {
		return (<>
			<div
				className={outterClassName}
			>
				<Toolbar>
					<a
						role={'button'}
						className="bg-white text-black hover:text-white hover:bg-gray-500  border-green-500 border px-4 py-2 mx-0 outline-none focus:shadow-outline"
						title={'Click To Open'}
						onClick={(e) => {
							e.preventDefault();
							toggleBox()
						}}
						>
							Open
					</a>
				</Toolbar>
			</div>
		</>);
	}


	let { content } = note;
    return (
        <>
			<div
				className={outterClassName}
			>
				<Toolbar>
					<a
						role={'button'}
						className="bg-white text-black hover:text-white hover:bg-gray-500  border-green-500 border border-r-0 rounded-l-lg px-4 py-2 mx-0 outline-none focus:shadow-outline"
						title={`Click to ${isOpen ? 'Close' : 'Open'}`}
						onClick={(e) => {
							e.preventDefault();
							toggleBox()
						}}
					>
						{isOpen ? 'Close' : 'Open'}
					</a>
					{!isLoggedIn && <Link href={`/notes/edit?note=${note.slug}`}>
							<a
								className="bg-white text-black hover:text-white hover:bg-gray-500  border-green-500 border px-4 py-2 mx-0 outline-none focus:shadow-outline"
								title={'Click To Edit'}
							>
									Edit
							</a>
						</Link>}
					<a
						className="bg-white text-black hover:text-white hover:bg-gray-500  border-green-500 border rounded-r-lg px-4 py-2 mx-0 outline-none focus:shadow-outline"
						title={'Click To Edit'}
					>
						Share
					</a>
				</Toolbar>
                {isOpen &&
					<div
						id={`note-${note.slug}`}
						className={"note-content"}
						onClick={() => setFocusNote(position)}
				>
						<NoteTitle note={note} />
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
						{note.references && <ReferencesBlock references={note.references} openPosition={nextPosition(position)} />}
						</>
                </div>
                }
            </div>
        </>
    )
}

export default Note