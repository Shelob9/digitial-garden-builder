import { createContext, useContext, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { INote } from "./Note";

const NotesContext = createContext(null);

export const NotesProvider = ({ children }) => {
    const { data: noteIndex } = useSWR('/api/notes', (url) => fetch(url).then(r => r.json()).then(
        r => {
            return r.noteIndex;
        }
    ));

    const [notes, setNotes] = useState<INote[]>([]);
    
    const addNote = (note: INote) => setNotes([...notes, note]);
    const fetchNote = (apiUrl: string) => {
        return fetch(apiUrl).then(r => r.json());
    }
    //put individual notes in state
    //@todo undo this, get notes closer to note.
    //Also, use useSwr
    useEffect(() => {
        if (noteIndex) {
            noteIndex.forEach(function  ({ apiUrl }) {
                fetchNote(apiUrl).then(
                    ({ note }) => addNote(note)
                )
                
            })
        }
    }, [noteIndex]);

    const getNote = (noteId): INote|undefined => {
      return notes && notes.find(note => noteId === note.id);
    }
  
    return <NotesContext.Provider value={{
        notes,
        getNote
    }}>
        {children}
    </NotesContext.Provider>
}

const useNotes = () => {
    const { notes, getNote } = useContext(NotesContext);
    const findBySlug = (noteSlug: string):INote|undefined => {
        if( notes && notes.length) {
            return notes.find(n => noteSlug === n.slug); 
        }
        return undefined;
    }
    return { notes, getNote,findBySlug }
}

export const useNote = (props: { noteId: number }) => {
    const { noteId } = props;
    const { getNote, notes } = useContext(NotesContext);
    
    const note = useMemo<INote | undefined>(() => {
        return getNote(noteId);
    },[noteId,notes])
    return note;
}
export default useNotes;
