import NoteEditor from 'components/NoteEditor';
import { NoteLayoutProvider } from 'components/useNoteLayout';
import {useRouter} from 'next/router';

const Page = () => {
  const { query } = useRouter();
  let slug = query && query.note ? query.note as string : '';
  
  return (
    <NoteLayoutProvider noteSlug={slug}>
      <NoteEditor slug={slug} />
    </NoteLayoutProvider>
   
  )
}
export default Page;


