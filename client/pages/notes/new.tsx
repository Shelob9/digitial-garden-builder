import { FC} from "react";
import { INote } from "../../../types";
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
export async function getServerSideProps({query}) {
  
  return {
      props: {
            slug: query && query.note ?query.note: ''

    },
  }
}
export default Page;
