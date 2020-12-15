import  { NotesProvider } from "../../components/useNotes";
import { NoteCreator } from "../../components/NoteEditor";

const Page = () => {
    return (
      <>
        <NotesProvider>
          <NoteCreator  />
        </NotesProvider>
      </>
    )
}

export default Page;
