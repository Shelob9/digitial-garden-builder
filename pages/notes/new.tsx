import { FC} from "react";
import { INote } from "../../components/Note";
import  { NotesProvider, useSingleNote } from "../../components/useNotes";
import { NoteCreator } from "../../components/NoteEditor";

const Page: FC<{ note?: INote,slug:string}> = (props) => {

    return (
      <>
        <NotesProvider>
          <NoteCreator  />
        </NotesProvider>
      </>
    )
}
export default Page;
