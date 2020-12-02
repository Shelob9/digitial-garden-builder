import { FC, useRef, useState } from "react";
import Layout from "../../components/Layout";
import MarkdownEditor from "../../components/MarkdownEditor";
import { INote } from "../../components/Note";
import  { NotesProvider, useSingleNote } from "../../components/useNotes";
import useIsLoggedInAuthorized from "../../hooks/useIsLoggedAuthorized";


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
const NotesEditor = (props: {
  note?: INote;
  slug: string;
}) => {
  let { note,saveNote } = useSingleNote({ note: props.note, slug: props.slug });
  if (note) {
    return <Inner note={note} saveNote={saveNote} />
  }
  return <div>Loading</div>
  
}
const Page: FC<{ note?: INote,slug:string}> = (props) => {
    const { isLoggedIn, userDisplayName, isSessionLoading } = useIsLoggedInAuthorized();
    return (
      <>
        <NotesProvider>
          <NotesEditor  {...props} />
          </NotesProvider>
        </>
    )
}
export default Page;

export async function getServerSideProps(context) {
  //do not get note server side to make sure its fresh in editor.
  let slug = context.query.note;
    return {
      props: {
          slug,

    },
  }
}