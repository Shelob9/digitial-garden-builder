import { gardenServiceFactory } from 'services/factory';
import NoteApp from '../components/NoteApp';
import { NoteLayoutProvider } from '../components/useNoteLayout';
import { useNoteSettings, useSingleNote } from '../components/useNotes';
import useIsLoggedIn from '../hooks/useIsLoggedAuthorized'


const Index = () => {
  const { isLoggedIn, } = useIsLoggedIn();
  const { defaultNote } = useNoteSettings();
  const { note } = useSingleNote(defaultNote);
  return (
    <>
      <>
        <NoteLayoutProvider>
          <NoteApp
            isLoggedIn={isLoggedIn}
            noteOneSlug={defaultNote} note={note}
          />
        </NoteLayoutProvider>
      </>
    </>
  )
}

export default Index;
