import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'
import toc from 'remark-toc';
import ReferencesBlock from "./references-block";
import { FC } from 'react';
import { NotePostion } from './noteReducer';
export interface INote {
	id: number;
	title: string;
	content: string;
  }
const v = (c) => {
    console.log(c);
    return c;
}
const Note: FC<{
	note: INote; onCollapseButton: () => void;
	isOpen: boolean
}> = ({ note, onCollapseButton, isOpen }) => {
	let { content } = note;
    return (
        <>
            <div
                className={`note-container ${isOpen ? 'note-open' : 'note-closed'}`}
            >
                <button onClick={
                    () => onCollapseButton()
                }>
                    {isOpen ? '-' : '+'}
                </button>
                {isOpen &&
                    <div className={"note-content"}>
                    < >
                        {
                            unified()
                                .use(parse)
                                .use(remark2react,{
                                    remarkReactComponents: {
                                        a: ({href,children}) => {
                                            return <a href={href}>{children}</a>
                                        },
                                    }
                                })
                                .use(toc)
                            .processSync(content).result
                        }
                    </>
                    <>
                        <ReferencesBlock references={[{
                            title: 'Ref 1 Title',
                            content: 'Ref 11',
                            slug: 'poos',
                            id:1
                        }] }/>  
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

            `}</style>
        </>
    )
}

export default Note