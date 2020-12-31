import { FC, useState } from "react";
import { notePostions } from "./noteLayoutReducer";
import NoteLink from "./NoteLink";
import useNoteLayout from "./useNoteLayout";
import { useSingleNote } from "./useNotes";
const ExternalLink = ({ href, children }) => <a className={'external'} href={href}>{children}</a>;
//import { Popover } from 'react-tiny-popover'

const InternalLink : FC<{
	href: string;
	children: any,
	openPosition: notePostions
	className?:string
}> = ({
	href,
	children,
	openPosition,
	className
}) => {
    let [isPopoverOpen, setIsPopoverOpen] = useState(false);
	let slug = href.substr('/notes/'.length);
	const { note } = useSingleNote({slug})
	const {
		openInNextPosition,
		setFocusNote,
		hasNote
	} = useNoteLayout();
	if ( note) {
		const onClick = () => {
			if (hasNote(note.slug)) {
				setFocusNote(note.slug)
			} else {
				openInNextPosition( note.slug, openPosition)	
				setFocusNote(note.slug)
			}
        }
        
        return (
            <span
                onMouseEnter={() => setIsPopoverOpen(true)}
                onMouseLeave={() => setIsPopoverOpen(false)}>
            <NoteLink
                    onClick={onClick}
                    className={className ?? 'reference'}
                    slug={slug}
                >
                    {children}
            </NoteLink>
                
        </span>
                
        )
	} else {
		return <ExternalLink href={href}>{children}</ExternalLink>
	}
}
//Render note to note links
const NoteMarkdownLink: FC<{
	href: string;
	children: any,
	openPosition: notePostions
	className?:string
}> = (props) => {
	let internal = props.href.startsWith('/notes/');
	if( internal ){
		return<InternalLink {...props} />
	}
	return <ExternalLink href={props.href}>{props.children}</ExternalLink>
}

export default NoteMarkdownLink;