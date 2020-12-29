import useGardenServer from "hooks/useGardenServer";
import { useMemo } from "react";
import { createContext, FC, useContext, useReducer, useState } from "react";
import useSWR from "swr";
import {Clipping,clippingCollection} from '../../types/clippings'

const ClippingsContext = createContext<{
    addClipping: (clipping: Clipping) => void;
    clippingIndex: {id:string|number}[]
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
    const { data: clippingIndex, mutate } = useSWR<{id:string|number}[]>(
        '/api/clippings',
        //@ts-ignore
        fetcher
    );
    
    const addClipping = useMemo(() => {
        return (clipping: Clipping) => {
            mutate([...clippingIndex,clipping])
        }
    }, [mutate]);
    return (
        <ClippingsContext.Provider value={{
            addClipping,
            clippingIndex,
            
        }}>
            {children}
        </ClippingsContext.Provider>
    )
}

export function useSingleClipping(props: { clippingId: string | number }) {
    let { clippingId } = props ;
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

    const { data: clipping, mutate } = useSWR(`/api/clippings/${clippingId}`, fetcher);

    const updateClipping = useMemo(() => {
        async (clipping: Clipping) => {
            return fetch(
                createUrl(`/api/clippings/${clippingId}`),
                {
                    headers: createHeaders(),
                    method: 'POST',
                    body: JSON.stringify(clipping)
                }
            )
                .then(r => r.json())
                .then(r => {
                    mutate(r.clipping);
                    return r.clipping;
                });
        };
    }, [createUrl, createHeaders]);
    
    return {
        clipping,
        updateClipping
    }
}

export default function useClippings() {
    const {
        addClipping,
        clippingIndex
    } = useContext(ClippingsContext);
    return {
        addClipping,
        clippingIndex
    }
}