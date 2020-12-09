import { FC} from "react";
import { INote } from "../../components/Note";
import  { NotesProvider, useSingleNote } from "../../components/useNotes";
import { NoteCreator } from "../../components/NoteEditor";
import { getSession } from 'next-auth/client';

const Page: FC<{ note?: INote,slug:string}> = (props) => {

    return (
      <>
        <NotesProvider>
          <NoteCreator  />
        </NotesProvider>
      </>
    )
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
      context.res.writeHead(302, { Location: '/login' });
      context.res.end();
  }
  return {
      props: {
            

    },
  }
}
export default Page;
