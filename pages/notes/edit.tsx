import { FC, useState } from "react";
import MarkdownEditor from "../../components/MarkdownEditor";
import { INote } from "../../components/Note";
import { NotesProvider } from "../../components/useNotes";
import useIsLoggedInAuthorized from "../../hooks/useIsLoggedAuthorized";
import NoteService from "../../noteService";

const Page: FC<{ note?: INote,noteId:number}> = ({ note,noteId }) => {
    const { isLoggedIn, userDisplayName, isSessionLoading } = useIsLoggedInAuthorized();
    
    let [value, setValue] = useState(note.content)
    return (
      <>
            <NotesProvider>
                <MarkdownEditor
                    value={value}
                    setValue={setValue} />
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