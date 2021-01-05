import { useRouter } from "next/router";
import { FC, forwardRef, Fragment,  useRef, useState } from "react";
const slugify = require('slugify')
import Layout from "./Layout";
import MarkdownEditor from "./MarkdownEditor";
import { INote } from "../../types";
import useNotes, { useSingleNote,} from "./useNotes";
import useSaveState from '../hooks/useSaveState';
import Note, { NoteContentWrapper } from "./Note";
import { NoteCollumnContainer, NoteScrollContainer } from "./NoteApp";
//editor for the title
const Title = forwardRef((props: {defaultValue:string}, ref) =>
    (
        <div>
            <label htmlFor={'title'}>
                Title
            </label>
            <input
                id={'title'} name={'title'} defaultValue={props.defaultValue || ''}
                //@ts-ignore
                ref={ref} 
            />
        </div>
    ));

//The actual editor
const Inner: FC<{
    note: INote,
    saveNote: (note: INote) => Promise<INote>,
    pageTitle: string;
  }>= ({note,saveNote,pageTitle}) => {
        let [value, setValue] = useState(note.content);
        let { setStatusMessage, setIsSaving }= useSaveState();
        let titleRef = useRef<HTMLInputElement>();
        const handleSave = async () => {
            setStatusMessage('Saving');
            saveNote({
                ...note,
                content: value,
                title: titleRef.current.value
            })
                .then(() => {
                setIsSaving(false);
                setStatusMessage('Saved');
                setTimeout(() => {
                    setStatusMessage(undefined);
                },2500)
            })
                .catch((e) => {
                    console.log(e);
                    setIsSaving(false);
                    setTimeout(() => {
                        setStatusMessage('Error');
                    },1500)
                    
                })
        }
  
        return (
            <Layout
                pageDisplayTitle={pageTitle}     
            >
                <NoteScrollContainer>
                    <NoteCollumnContainer>
                        <NoteContentWrapper slug={note.slug}>
                            <MarkdownEditor
                                value={value}
                                setValue={setValue}
                            />
                        </NoteContentWrapper>
                        <NoteContentWrapper id={'Note editor controls'}>
                            <>
                                <section>
                                    <button onClick={handleSave}>Save</button>
                                    <a href={`/notes/${note.slug}`} target={'_blank'}>View</a>
                                </section>
                                <Title defaultValue={note.title} ref={titleRef} />
                            </>  
                        </NoteContentWrapper>
                    </NoteCollumnContainer>
                </NoteScrollContainer>
            </Layout>  
        )
}

//Wraps editor with title/ slug creator for new notes
export const NoteCreator = () => {
    let [createdTitle, setCreatedTitle] = useState(false);
    let router = useRouter();
    let [message, setMessage] = useState<string>('');
    let titleRef = useRef<HTMLInputElement>();
    const pageTitle = 'Create New Note';
    let [initalNote, setInitalNote] = useState<INote>();
    const { addNote,createNote } = useNotes();
    const onCreateButton = () => {
        if (!titleRef.current || slugify(titleRef.current.value).length < 3) {
            setMessage('Must add title longer then 3 charecters first.');
        } else {
            setCreatedTitle(true);
            setMessage('');
            const slug = slugify(titleRef.current.value)
                .toLowerCase();
            setInitalNote({
                title: titleRef.current.value,
                slug,
                content: '',
            });
            addNote(
                {
                    slug,
                    path: `notes/${slug}.md`,
                    name: `${slug}.md`,
                    url: `/notes/${slug}`,
                    apiUrl: `/api/notes/${slug}`
                }
             )
        }
    }

    const onSave = async (note:INote) => {
        return await createNote(note).then(
            () => {
                router.push(`/notes/edit?note=${note.slug}`);
                return note;
            }
        )
    }
    if (!createdTitle) {
        return (
            <Layout
                pageDisplayTitle={pageTitle}
            >    
                <NoteScrollContainer>
                    <NoteCollumnContainer>
                        <NoteContentWrapper>
                            <Title defaultValue={''} ref={titleRef} />
                            <button onClick={onCreateButton}>Create</button>
                            <p>{message}</p>
                        </NoteContentWrapper>
                    </NoteCollumnContainer>
                </NoteScrollContainer>
            </Layout>
        )
         
    }

    return <Inner note={initalNote} saveNote={onSave} pageTitle={pageTitle} />
};

//Wraps note editor with loading state for editting note
const NoteEditor :FC<{
    note?: INote;
    slug: string;
}> = (props) => {
    let { note,saveNote } = useSingleNote({ note: props.note, slug: props.slug });
    if (note) {
      return <Inner note={note} saveNote={saveNote} pageTitle={`Edit Note`} />
    }
    return (
        <Layout
        pageDisplayTitle={'Note Editor'}
    >    
        <NoteScrollContainer>
            <NoteCollumnContainer>
                <NoteContentWrapper>
                    <div className={'animate-pulse'}>Loading</div>
                </NoteContentWrapper>
            </NoteCollumnContainer>
        </NoteScrollContainer>
    </Layout>) 
}
export default NoteEditor;