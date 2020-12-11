import useUserToken from "hooks/useUserCookie";
import { createContext, useContext, useMemo } from "react";
import useSWR from "swr";
import {  noteIndexItem,INote } from "../../types";
let gardenServer = process.env.NEXT_PUBLIC_GARDEN_SERVER_URL || 'https://garden-server.vercel.app'
const NotesContext = createContext(null);

//Create URL with garden server from uri
// Provide uris with forward slash - `/api/hi/roy` - please
function createUrl(uri:string) {
    let url = `${gardenServer}${uri}`
    return url;
}

//Returns a fetch function for garden server
const createFetch = (token: string | undefined,handler:(r:any) => any) => {
    
    
    if (token) {
        return (uri:string, args: any) => {
            args = Object.assign({
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            } , args);
            return fetch(createUrl(uri), args)
                .then(r => r.json())
                .then(
                    handler
                );
        };
    }
    return (uri:string, args: any) => {
        return fetch(createUrl(uri), args)
            .then(r => r.json())
            .then(
                handler
            );
    };
}


//Context provider for note index
export const NotesProvider = ({ children }) => {
    //Get token and create a stable fetch function with it.
    const { token } = useUserToken({});
    const noteFetcher = useMemo(() => {
        return createFetch(token, r => {
            return r.noteIndex;
        });
    }, [token])

    //Stable function to create ntoes
    const createNote = useMemo(() => {
        return (note: INote) => {
            return fetch(`${gardenServer}/api/notes`, {
                method: 'PUT',
                body: JSON.stringify({ note }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                }
          
            })
                .then(r => r.json())
                .then(r => {
                    return r.note;
            })
        }
    }, [token]);
    
    //Get note index from API and memoize
    const { data: noteIndex,mutate } = useSWR(`/api/notes`,noteFetcher );
    let notes = useMemo(() => noteIndex ?? [], [noteIndex]);//Why?

    const getNote = (slug): noteIndexItem | undefined => {
        return notes && notes.find(note => slug === note.slug);
    }

    const addNote = (note) => {
        mutate([...notes, note]);
    }
  
    return <NotesContext.Provider value={{
        notes,
        getNote,
        addNote,
        createNote
    }}>
        {children}
    </NotesContext.Provider>
}

//State of note index
//@TODO rename this useNoteIndex
const useNotes = () => {
    const { notes, getNote,addNote,createNote } = useContext(NotesContext);
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
    return { notes, getNote,findBySlug,allSlugs,allNoteLinks,addNote,createNote }
}

export default useNotes;

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
    //Get token and create a stable fetch function with it.
    const { token } = useUserToken({});
    const noteFetcher = useMemo(() => {
        return createFetch(token, r => {
            return r.note;
        });
    }, [token])
    
    //Get single note via API
    const { data: note,mutate  } = useSWR(
        `/api/notes/${props.slug}`,
        noteFetcher,
        { initialData: props.note }
    );
    //Update a note
    const saveNote = async (note: INote) => {
        delete note.references;
        mutate(note);
        return fetch(createUrl(`/api/notes/${props.slug}`), {
            method: 'POST',
            body: JSON.stringify({ note }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
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