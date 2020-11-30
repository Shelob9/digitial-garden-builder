import { FC, useState } from "react";
import Layout from "../../components/Layout";
import MarkdownEditor from "../../components/MarkdownEditor";
import { INote } from "../../components/Note";
import { NotesProvider } from "../../components/useNotes";
import useIsLoggedInAuthorized from "../../hooks/useIsLoggedAuthorized";
import NoteService from "../../NoteService";

const Page: FC<{ note?: INote,noteId:number}> = ({ note,noteId }) => {
    const { isLoggedIn, userDisplayName, isSessionLoading } = useIsLoggedInAuthorized();
    
  let [value, setValue] = useState(note.content);
  let [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false)
    },3000);
  }
    return (
      <>
        <NotesProvider>
          <Layout
            pageDisplayTitle={`Edit Note`}
            statusMessage={isSaving ? 'Saving':undefined}
            BeforeControls={() => <button onClick={handleSave}>Save</button>}
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
          </NotesProvider>
        </>
    )
}
export default Page;
export async function getServerSideProps({  query }) {
  const noteId = parseInt(query.noteId, 10);
  const notes = new NoteService();
  let note = notes.getNoteById(noteId);
    return {
      props: {
            noteId,
            note
    },
  }
}