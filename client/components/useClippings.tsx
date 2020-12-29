import useGardenServer from "hooks/useGardenServer";
import { useMemo } from "react";
import { createContext, FC, useContext, useReducer, useState } from "react";
import useSWR from "swr";
import {Clipping,clippingCollection} from '../../types/clippings'

const ClippingsContext = createContext<{
    addClipping: (clipping: Clipping) => void;
    clippings: clippingCollection
}>(
    null
);

export const ClippingsProvider = ({ children }) => {
    const { createUrl, createHeaders } = useGardenServer({});
    const fetcher = useMemo(() => {
        return (url): Clipping => {
            //@ts-ignore
            return fetch(
                createUrl(url),
                { headers: createHeaders() }
            ).then(r => r.json())
                .then(r => {
                    
                    return r.index;
            })
        };
    }, [createUrl, createHeaders]);
    const { data: clippings, mutate } = useSWR<clippingCollection>(
        '/api/clippings',
        //@ts-ignore
        fetcher
    );
    
    const addClipping = useMemo(() => {
        return (clipping: Clipping) => {
            mutate([...clippings,clipping])
        }
    }, [mutate]);
    return (
        <ClippingsContext.Provider value={{
            addClipping,
            clippings
        }}>
            {children}
        </ClippingsContext.Provider>
    )
}

export default function useClippings() {
    const {
        addClipping,
        clippings
    } = useContext(ClippingsContext);
    return {
        addClipping,
        clippings
    }
}