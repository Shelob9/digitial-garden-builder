import NoteEditor from '../../components/NoteEditor';
import {useRouter} from 'next/router';
import Note from 'components/Note';
import useNoteLayout, { NoteLayoutProvider } from 'components/useNoteLayout';
import useIsLoggedInAuthorized from 'hooks/useIsLoggedAuthorized';

const EditorWithNotes = ({slug}) => {
  const { isNoteOpen, toggleBox } = useNoteLayout();
  const { isLoggedIn } = useIsLoggedInAuthorized();
  return (
    <div className={'note-columns-scrolling-container'}>
    <div className={'note-columns-container'}>
        <NoteEditor slug={slug} />
        <Note slug={'usage'} isOpen={isNoteOpen('one')} position={'one'} toggleBox={() => toggleBox('one')} isLoggedIn={isLoggedIn} />
      </div>
    </div>
  )
}
const Page = () => {
  const { query } = useRouter();
  let slug = query && query.note ? query.note as string : '';
  
  return (
    <NoteLayoutProvider noteSlug={slug}>
     
    </NoteLayoutProvider>
   
  )
}
export default Page;


