import { useRouter } from "next/router";
import { FC, forwardRef, Fragment, MutableRefObject, useRef, useState } from "react";
const slugify = require('slugify')
import Layout from "./Layout";
import MarkdownEditor from "./MarkdownEditor";
import { INote } from "./Note";
import useNotes, { useSingleNote } from "./useNotes";

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
    let [isSaving, setIsSaving] = useState(false);
    let titleRef = useRef<HTMLInputElement>();
    
  
    const handleSave = async () => {
      setIsSaving(true);
      saveNote({
        ...note,
        content: value,
        title: titleRef.current.value
      }).then(() => setIsSaving(false));
    }
    const BeforeControls = () => (
        <>
          <Title defaultValue={note.title} ref={titleRef} />
          <button onClick={handleSave}>Save</button>
        </>
    );
  
    return (
      <Layout
              pageDisplayTitle={pageTitle}
              statusMessage={isSaving ? 'Saving':undefined}
              BeforeControls={BeforeControls}
            >
                <div
                    className={`note-container note-editor-container`}
                >
                    <MarkdownEditor
                      value={value}
                      setValue={setValue}
                    />
                </div>
              </Layout>  
        )
    }
  
//Create a new note
const createNote = async (note: INote) => {
        return fetch(`/api/notes`, {
            method: 'PUT',
            body: JSON.stringify({ note }),
            headers: {
                'Content-Type': 'application/json'
            }
      
        })
            .then(r => r.json())
            .then(r => {
                return r.note;
        })
}

//Wraps editor with title/ slug creator for new notes
export const NoteCreator = () => {
    let [createdTitle, setCreatedTitle] = useState(false);
    let router = useRouter();
    let [message, setMessage] = useState<string>('');
    let titleRef = useRef<HTMLInputElement>();
    const pageTitle = 'Create New Note';
    let [initalNote, setInitalNote] = useState<INote>();
    const { addNote } = useNotes();
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
    const BeforeControls = () => (<Fragment />);
    if (!createdTitle) {
        return (
            <Layout
                    pageDisplayTitle={pageTitle}
                    BeforeControls={BeforeControls}
                    >
                        <div
                            className={`note-container note-editor-container`}
                >
                    <Title defaultValue={''} ref={titleRef} />
                    <button onClick={onCreateButton}>Create</button>
                    <p>{message}</p>
                </div>
            </Layout>
        )
         
    }

    return <Inner note={initalNote} saveNote={onSave} pageTitle={pageTitle} />
};

//Wraps note editor with loading state for editting note
const NoteEditor = (props: {
    note?: INote;
    slug: string;
  }) => {
    let { note,saveNote } = useSingleNote({ note: props.note, slug: props.slug });
    if (note) {
      return <Inner note={note} saveNote={saveNote} pageTitle={`Edit Note`} />
    }
    return <div>Loading</div>
    
  }
export default NoteEditor;