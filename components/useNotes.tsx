import { createContext, useContext, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { INote } from "./Note";

const NotesContext = createContext(null);

//Context provider for note index
//TODO Type for note index, different from INOTE
export const NotesProvider = ({ children }) => {
    const { data: noteIndex } = useSWR('/api/notes', (url) => fetch(url).then(r => r.json()).then(
        r => {
            return r.noteIndex;
        }
    ));

    const [notes, setNotes] = useState<INote[]>([]);

    //Not an INote actually.
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

//State of note index
//@TODO rename this useNoteIndex
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

export default useNotes;

//Fetch function for single note via local API
const fetcher = (url) => fetch(url)
    .then(r => r.json())
    .then(r => {
        return r.note;
    })
//Hook for single notes, via local API
export const useSingleNote = (props: {
    //optional, initial note data.
    note?: INote;
    //slug of note
    slug: string;
}
) => {
    const { data: note } = useSWR(
        `/api/notes/${props.slug}`,
        fetcher,
        { initialData: props.note }
    );
    return note;
}
