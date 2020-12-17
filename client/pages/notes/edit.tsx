import NoteEditor from '../../components/NoteEditor';
import {useRouter} from 'next/router';


const Page = () => {
  const { query } = useRouter();
  let slug = query && query.note ? query.note as string : '';
  
  return (
    <>
      <>
        <NoteEditor slug={slug} />
        </>
    </>
  )
}
export default Page;


