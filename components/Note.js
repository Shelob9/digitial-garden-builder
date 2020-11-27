import "./note.css";
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'
import toc from 'remark-toc';
import ReferencesBlock from "./references-block";
const v = (c) => {
    console.log(c);
    return c;
}
const Note = ({ content, isOpen,onCollapseButton,position }) => {
    return (
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
                            .use(v)
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
    )
}

export default Note