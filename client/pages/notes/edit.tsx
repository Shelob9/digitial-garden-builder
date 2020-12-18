import NoteEditor from '../../components/NoteEditor';
import {useRouter} from 'next/router';
import Note from 'components/Note';
import useNoteLayout, { NoteLayoutProvider } from 'components/useNoteLayout';
import useIsLoggedInAuthorized from 'hooks/useIsLoggedAuthorized';
import useNotes from 'components/useNotes';
import { useMemo } from 'react';

const EditorWithNotes = ({slug}) => {
  const { isNoteOpen, toggleBox } = useNoteLayout();
  const { isLoggedIn } = useIsLoggedInAuthorized();
  const { getNote } = useNotes();
  let noteTwoSlug = useMemo(() => {
    let note = getNote('usage');
    if (note) {
      return note.slug;
    }
  }, []);
  return (
    <div className={'note-columns-scrolling-container'}>
    <div className={'note-columns-container'}>
        <NoteEditor slug={slug} />
        {noteTwoSlug && <Note slug={noteTwoSlug} isOpen={isNoteOpen('one')} position={'one'} toggleBox={() => toggleBox('one')} isLoggedIn={isLoggedIn} />
        }
      </div>
    </div>
  )
}
const Page = () => {
  const { query } = useRouter();
  let slug = query && query.note ? query.note as string : '';
  
  return (
    <NoteLayoutProvider noteSlug={slug}>
      <EditorWithNotes slug={slug} />
    </NoteLayoutProvider>
   
  )
}
export default Page;


