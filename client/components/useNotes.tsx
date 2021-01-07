import useGardenServer from "hooks/useGardenServer";
import useUserToken from "hooks/useUserCookie";
import { createContext, useContext, useMemo } from "react";
import useSWR from "swr";
import {  noteIndexItem,INote } from "../../types";
import { GardenConfig } from "../../types/config";

/**
 * The garden settings
 * 
 * Will be replaced at build-time.
 * Also, will be re-fetched at page load.
 */
import gardenConfig from '../garden'
const NotesContext = createContext(null);

/**
 * Returns a fetch function for garden server
 * 
 * Converts URIs to complete URLs and adds authentication headers.
 * Fetch function can be used for second arg of `useSwr()` hook. 
 *
 * @param token JWT auth token or undefiend.
 * @param handler A callback function, which is passed the parsed response.
 */
const createFetch = (token: string | undefined,handler:(r:any) => any) => {
    const { createUrl,createHeaders } = useGardenServer({token});
    return (uri:string, args: any) => {
        args = Object.assign({
            headers: createHeaders()
        }, args);
        return fetch(createUrl(uri), args)
            .then(r => r.json())
            .then(
                handler
            );
    };
}


//Context provider for note index
export const NotesProvider = ({ children }) => {
    const { gardenServerPublicKey } = useGardenServer({});

    //Get token and create a stable fetch function with it.
    const { token } = useUserToken({});
    const noteFetcher = useMemo(() => {
        return createFetch(token, r => {
            return r.noteIndex;
        });
    }, [token]);

    const singleNoteFetcher = useMemo(() => {
        return createFetch(token, r => {
            return r.note;
        });
    }, [token])

    const { createUrl,createHeaders } = useGardenServer({token});

    //Stable function to create ntoes
    const createNote = useMemo(() => {
        return (note: INote) => {
            return fetch(createUrl( `api/notes`), {
                method: 'PUT',
                body: JSON.stringify({ note }),
                headers: createHeaders()
          
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

    /**
     * Fetch note from local storage, or remote API 
     */
    const fetchNote = async (slug: string) => {
        let key = `${gardenServerPublicKey}-garden-notes-${slug}`;
        return new Promise(async (resolve) => {
            //let cached = localStorage.getItem(key);
            
            let note = await singleNoteFetcher(
                `/api/notes/${slug}`, { method: "GET" }
            );
            //localStorage.setItem(key, JSON.stringify(note));
            resolve(note);
        })
         
    }
  
    return <NotesContext.Provider value={{
        notes,
        getNote,
        addNote,
        createNote,
        fetchNote
    }}>
        {children}
    </NotesContext.Provider>
}

//State of note index
//@TODO rename this useNoteIndex
const useNotes = () => {
    const { notes, getNote,addNote,createNote,fetchNote } = useContext(NotesContext);
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

    
    return { notes, getNote,findBySlug,allSlugs,allNoteLinks,addNote,createNote,fetchNote }
}

export default useNotes;
 
export const useNoteSettings = () => {
    //Get token and create a stable fetch function with it.
    const { token } = useUserToken({});
    const settingsFetcher = useMemo(() => {
        return createFetch(token, r => {
            return r.settings;
        });
    }, [token])

    //Get settings via api
    const { data,mutate  } = useSWR(
        `/api/settings`,
        settingsFetcher,
        {initialData: gardenConfig }
    );

    const { createUrl,createHeaders } = useGardenServer({token});
    const saveSettings = async (settings: GardenConfig) : Promise<GardenConfig> => {
        return fetch(createUrl(`/api/settings`), {
            method: 'POST',
            body: JSON.stringify({ settings }),
            headers: createHeaders(),

        }).then(r => r.json())
            .then(r => {
                if (r.settings) {
                    mutate(r.settings)
                    return r.settings;
                }
                return settings;
        })
    }

    const siteName = useMemo(() => {
        return data && data.siteName ? data.siteName : 'Digital Garden'
    }, [data]);
    
    const siteTwitter = useMemo(() => {
        return data && data.siteTwitter ? data.siteTwitter : gardenConfig.siteTwitter
    }, [data]);
    
    const authorName = useMemo(() => {
        return data && data.authorName ? data.authorName : gardenConfig.authorName
    }, [data]);
    

    const authorTwitter = useMemo(() => {
        return data && data.authorTwitter ? data.authorTwitter : gardenConfig.authorTwitter
    }, [data]);
    
    const defaultNote = useMemo(() => {
        return data && data.defaultNote ? data.defaultNote :gardenConfig.defaultNote
    }, [data]);
    

    return {
        settings: data as GardenConfig,
        saveSettings,
        siteName,
        siteTwitter,
        authorName,
        authorTwitter,
        defaultNote,
    }
}

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
    const { createUrl,createHeaders } = useGardenServer({token});

    
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
            headers: createHeaders()

        })
            .then(r => r.json())
            .then(r => {
                mutate(r.note);
                return r.note;
        })
    }
    
    return { note,saveNote };
}