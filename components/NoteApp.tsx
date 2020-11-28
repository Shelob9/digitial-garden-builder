
import React,{useEffect,useState,useMemo, FC} from 'react'
import noteReducer from './noteReducer'
import Layout from '../components/Layout';
import Note, { INote } from '../components/Note';
import useSWR, { SWRConfig } from 'swr'





let intitalState = {
  one: {
    noteId: 1,
    open: true,
  },
  two: {
    noteId: 2,
    open:false,
  }

}

const NoteApp: FC<{ noteSlug?: string, isLoggedIn: boolean; userDisplayName?:string;}>= ({noteSlug,userDisplayName,isLoggedIn}) => {
  
  const [currentNotes, dispatchNotesAction] = React.useReducer(
    noteReducer,
    intitalState
  );

  const { data: allNotes } = useSWR('/api/notes');

  const getNote = (noteId): INote|undefined => {
    return allNotes && allNotes.find(note => noteId === note.id);
  }

  const noteOne = useMemo<INote>(() => {
    let note = currentNotes.one ?
      getNote(currentNotes.one.noteId) : undefined;

    if (!note) {
      note = {
        id: 10000,
        title: 'Default Note',
        content: 'Need to have this'
      }
    }
    return note;
  }, [currentNotes,allNotes]);

  const noteTwo = useMemo<INote|undefined>(() => {
    if (currentNotes.two) {
      return getNote(currentNotes.two.noteId)

    }
    return undefined;
  }, [currentNotes,allNotes]);

  const noteThree = useMemo<INote|undefined>(() => {
    if (currentNotes.three) {
      return getNote(currentNotes.three.noteId)

    }
    return undefined;
  }, [currentNotes,allNotes]);

  const isNoteOpen = (notePosition) => currentNotes.hasOwnProperty(notePosition) &&currentNotes[notePosition].open;
  
  const toggleBox = (notePosition) => {
    if (! isNoteOpen(notePosition)) {
      dispatchNotesAction({
        notePosition,
        type:'expandNote'
      });
    } else {
      dispatchNotesAction({
        notePosition,
        type:'collapseNote'
      });

    }
  }



  return (
    <>
       <SWRConfig
        value={{
          fetcher: (url: string,args?:any) => fetch(url,args).then(res => res.json())
      }}
    >
        <Layout >
          {allNotes ? (<>
            
            <Note
              note={noteOne}
              isOpen={isNoteOpen('one')}
              onCollapseButton={() => toggleBox('one')}
            />
            {noteTwo && <Note
              note={noteTwo}
              isOpen={isNoteOpen('two')}
              onCollapseButton={() => toggleBox('two')}
            />}
            {noteThree && <Note
              note={noteThree}
              isOpen={isNoteOpen('three')}
              onCollapseButton={() => toggleBox('three')}

            />}
          </>) : <div>Loading</div>}
        </Layout>
      </SWRConfig>
    </>
    )
  
}

export default NoteApp;