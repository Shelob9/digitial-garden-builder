import { FC} from "react";
import NoteEditor from '../../components/NoteEditor';
import { INote } from "../../components/Note";
import  { NotesProvider, useSingleNote } from "../../components/useNotes";
import useIsLoggedInAuthorized from "../../hooks/useIsLoggedAuthorized";
import { getSession } from 'next-auth/client';
const Page: FC<{ note?: INote,slug:string}> = (props) => {
    const { isLoggedIn, userDisplayName, isSessionLoading } = useIsLoggedInAuthorized();
    return (
      <>
        <NotesProvider>
          <NoteEditor  {...props} />
          </NotesProvider>
        </>
    )
}
export default Page;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
      context.res.writeHead(302, { Location: '/login' });
      context.res.end();
  }
  //do not get note server side to make sure its fresh in editor.
  let slug = context.query.note;
    return {
      props: {
          slug,

    },
  }
}