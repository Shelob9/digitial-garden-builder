import NoteEditor from '../../components/NoteEditor';
import  { NotesProvider } from "../../components/useNotes";
import {useRouter} from 'next/router';


const Page = () => {
  const { query } = useRouter();
  let slug = query && query.note ? query.note as string : '';
  
  return (
    <>
      <NotesProvider>
        <NoteEditor slug={slug} />
        </NotesProvider>
    </>
  )
}
export default Page;


