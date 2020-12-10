import { createContext, useContext, useMemo } from "react";
import useSWR from "swr";
import {  noteIndexItem,INote } from "../../types";

const NotesContext = createContext(null);

//Context provider for note index
export const NotesProvider = ({ children }) => {
    const { data: noteIndex,mutate } = useSWR('/api/notes', (url) => fetch(url).then(r => r.json()).then(
        r => {
            return r.noteIndex;
        }
    ));

    let notes = useMemo(() => noteIndex ?? [], [noteIndex]);
    const getNote = (slug): noteIndexItem|undefined => {
      return notes && notes.find(note => slug === note.slug);
    }

    const addNote = (note) => {
        mutate([...notes, note]);
    }
  
    return <NotesContext.Provider value={{
        notes,
        getNote,
        addNote
    }}>
        {children}
    </NotesContext.Provider>
}

//State of note index
//@TODO rename this useNoteIndex
const useNotes = () => {
    const { notes, getNote,addNote } = useContext(NotesContext);
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
    }, [notes]);
    return { notes, getNote,findBySlug,allSlugs,allNoteLinks,addNote }
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
        saveNote: (note: INote) => Promise<INote>;
} => {
    
    const { data: note,mutate  } = useSWR(
        `/api/notes/${props.slug}`,
        fetcher,
        { initialData: props.note }
    );
    const saveNote = async (note: INote) => {
        delete note.references;
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
