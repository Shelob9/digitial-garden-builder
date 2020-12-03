import { FC, useRef, useState } from "react";
import Layout from "./Layout";
import MarkdownEditor from "./MarkdownEditor";
import { INote } from "./Note";
import { useSingleNote } from "./useNotes";

const Inner: FC<{
    note: INote,
    saveNote: (note: INote) => Promise<INote>
  }>= ({note,saveNote}) => {
    let [value, setValue] = useState(note.content);
    let [isSaving, setIsSaving] = useState(false);
    let titleRef = useRef<HTMLInputElement>();
    const BeforeControls = () => (
      <>
        <div>
          <label htmlFor={'title'}>
            Title
          </label>
          <input ref={titleRef} id={'title'} name={'title'} defaultValue={note.title || ''} />
        </div>
        <button onClick={handleSave}>Save</button>
      </>
    );
  
    const handleSave = async () => {
      setIsSaving(true);
      saveNote({
        ...note,
        content: value,
        title: titleRef.current.value
      }).then(() => setIsSaving(false));
    }
  
    return (
      <Layout
              pageDisplayTitle={`Edit Note`}
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
const NoteEditor = (props: {
    note?: INote;
    slug: string;
  }) => {
    let { note,saveNote } = useSingleNote({ note: props.note, slug: props.slug });
    if (note) {
      return <Inner note={note} saveNote={saveNote} />
    }
    return <div>Loading</div>
    
  }
export default NoteEditor;