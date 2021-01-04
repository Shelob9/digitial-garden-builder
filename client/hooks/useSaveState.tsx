import { useContext } from "react";
import { createContext, useState } from "react";


const SaveStateContext = createContext(undefined);
export const SaveStateProvider = ({children}) => {
    let [statusMessage, setStatusMessage] = useState<string | undefined>(undefined);
    let [isSaving, setIsSaving] = useState(false);
    return (
        <SaveStateContext.Provider value={{
            statusMessage, setStatusMessage,isSaving, setIsSaving
        }}>
            {children}
        </SaveStateContext.Provider>
    )
}

export default function useSaveState() {
    const {
        statusMessage, setStatusMessage, isSaving, setIsSaving
    } = useContext(SaveStateContext);

    const setStatusFor = (temporaryMessage: string, timeoutTime: number) => {
        setStatusMessage(temporaryMessage);
        setTimeout(() => {
            setStatusMessage(undefined);
        },timeoutTime)
    }

    return {
        statusMessage, setStatusMessage, isSaving, setIsSaving,setStatusFor
    };

}