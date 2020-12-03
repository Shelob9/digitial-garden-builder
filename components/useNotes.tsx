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

    //should be noteIndex type
    const [notes, setNotes] = useState<INote[]>([]);

    //Not an INote actually.
    const getNote = (noteId): INote|undefined => {
      return notes && notes.find(note => noteId === note.id);
    }
  
    return <NotesContext.Provider value={{
        notes,
        getNote,
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

    const allSlugs = useMemo(() => {
        return notes.map(({ slug }) => slug);
    }, [notes]);

    const allNoteLinks = useMemo(() => {
        return notes.map(({ url }) => url);
    },[notes]);
    return { notes, getNote,findBySlug,allSlugs,allNoteLinks }
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
): {
        note: INote | undefined;
        saveNote: (note:INote) => Promise<INote>
} => {
    
    const { data: note,mutate  } = useSWR(
        `/api/notes/${props.slug}`,
        fetcher,
        { initialData: props.note }
    );
    const saveNote = async (note: INote) => {
        delete note.references;
        console.log(note);

        mutate(note);
        return fetch(`/api/notes/${props.slug}`, {
            method: 'POST',
            body: JSON.stringify({ note }),
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then(r => r.json())
            .then(r => {
                mutate(r.note);
                return r.note;
        })
    }
    return { note,saveNote };
}
