import { createContext, useContext, useMemo } from "react";
import useSWR from "swr";
import {  noteIndexItem,INote } from "../../types";
let gardenServerUrl =
	process.env.NEXT_PUBLIC_GARDEN_SERVER_URL ||
	'https://garden-server.vercel.app'
const NotesContext = createContext(null);

/**
 * Fetch function for Garden Server
 * 
 * Wraps fetch with the right url
 
 */
export const gardenFetcher = (url: string,args?:any) => {
    return fetch(`${gardenServerUrl}${url}`,
        Object.assign(args, {
            headers: {
                'content-type': 'application-json',
                Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDc2NDIzMzksImRhdGEiOnsibmFtZSI6Ikpvc2ggUG9sbG9jayIsInNlc3Npb24iOnsiaXYiOiIzOWNlMjAzZmQ4YjMxY2I4MWQzNjliOGM4NmNlMjUzNCIsImNvbnRlbnQiOiI5OGM5MjE4ZWMxMzMzNGRjYWU2ZjJkMWU3NTA3NDBmM2UwMTI3NGE1ZTQzN2RkNTJkYmFjYzUyOTUyZmQzY2U4NDc4NWI5ZDRlMmVmZGUxNmUwZDQ0NDg2YzBjZjRiYjcwZWVlY2MyZTI5YjMxYmJmZTZlZmE0MDllOGNhZTcyMDAzOGZiZjZlMGNjMGI5NzEyYTAxOWZiZTFlNGMwMmM5YTkwNTlhMTE1ZjVhNTgxNmI0MGZkZDhkMGM1ZDY5MTQwMTViZTMwYTM0ZjhhZTg4YWE1YmNlNWRlYWY0NDJhYzNkOWMwZCJ9fSwiaWF0IjoxNjA3NjM4NzM5fQ.UjTVm862NkjyuJuoNqtSEhckNd0qZt6590mJEYmYYuk`
            }
        }).catch(e => console.log(e))
    );
}

//Context provider for note index
export const NotesProvider = ({ children }) => {
    const { data: noteIndex,mutate } = useSWR('/api/notes', (url) => gardenFetcher(url).then(r => r.json()).then(
        r => {
            console.log(r);
            return r.noteIndex;
        }
    ))
    console.log(noteIndex);

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
export const noteFetcher = (url) => gardenFetcher(url)
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
        noteFetcher,
        { initialData: props.note }
    );
    const saveNote = async (note: INote) => {
        delete note.references;
        mutate(note);
        return gardenFetcher(`/api/notes/${props.slug}`, {
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
