import {useTextField} from '@react-aria/textfield'
import { FC, forwardRef, useRef, useState } from 'react';
import Layout from '../../components/Layout';
import { GardenConfig } from '../../../types/config';
import useNotes, {  NotesProvider, useNoteSettings } from '../../components/useNotes';
import useUserToken from 'hooks/useUserCookie';
import { useMemo } from 'react';
import useGardenServer from 'hooks/useGardenServer';
import { useEffect } from 'react';

const FieldWrapper = ({ children }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: 200 }}>
            {children}
        </div>
    );
}
const TextField = forwardRef((props: {
    label: string;
    defaultValue?: string;
    disabled?: boolean;
}, ref) => {
    let { label,disabled } = props;
    let { labelProps, inputProps } = useTextField(
        props,
        //@ts-ignore
        ref
    );
  
    return (
        <FieldWrapper>
            <label {...labelProps}>{label}</label>
            <input {...inputProps}
                disabled={disabled}
                //@ts-ignore
                ref={ref}
            />
        </FieldWrapper>
    );
});


const NoteSelector = ({selectedNote,setSelectedNote}) => {
    let { allSlugs } = useNotes();
    return (
        <FieldWrapper>
            <label htmlFor={"default-note"}>Default Note</label>
            <select
                value={selectedNote}
                onChange={e => {
                    setSelectedNote(e.target.value);
                }}
                id={"default-note"}
                name={"default-note"}
            >
                {allSlugs.map(slug => (
                    <option value={slug} key={slug}>{slug}</option>
                ))}
            </select>
        </FieldWrapper>
    )
}
const Settings = () => {

    const { settings,saveSettings } = useNoteSettings();

    const siteNameRef = useRef();
    const siteTwitterRef = useRef();
    const authorNameRef = useRef();
    const authorTwitterRef = useRef();
    let [defaultNote, setDefaultNote] = useState<string>(settings && settings.defaultNote ? settings.defaultNote: '');
    let [isSaving, setIsSaving] = useState(false);
    const onSave = () => {
        setIsSaving(true);
        let data: GardenConfig = Object.assign(settings, {
            defaultNote,
            //@ts-ignore
            siteName: siteNameRef.current.value,
            //@ts-ignore
            siteTwitter: siteTwitterRef.current.value,
            //@ts-ignore
            authorName: authorNameRef.current.value,
            //@ts-ignore
            authorTwitter: authorTwitterRef.current.value,
        })
        saveSettings(data).then(
            () => setIsSaving(false)
        );
    }
    return (
        <>
            <Layout pageDisplayTitle={'Settings'}>
                <>
                    {settings ? <form id={"settings"} onSubmit={e => {
                    e.preventDefault();
                    onSave();
                }}
                >
                    <section>
                            <TextField
                                disabled={isSaving}
                                ref={siteNameRef}
                                label={'Site Name'}
                                defaultValue={settings.siteName}
                            />
                            <TextField
                                disabled={isSaving}
                                ref={siteTwitterRef}
                                label={'Site Twitter'}
                                defaultValue={settings.siteTwitter}
                            />
                    </section>
                    <section>
                            <TextField
                                disabled={isSaving}
                                ref={authorNameRef}
                                label={'Author Name'}
                                defaultValue={settings.authorName}
                            />
                            <TextField
                                disabled={isSaving}
                                ref={authorTwitterRef}
                                label={'Author Twitter'}
                                defaultValue={settings.authorTwitter}
                            />
                        </section> 
                    <section>
                        <NoteSelector
                            selectedNote={defaultNote}
                            setSelectedNote={setDefaultNote} />
                        </section>
                        <section>
                            <button
                                disabled={isSaving}
                                onClick={(e) => {
                                e.preventDefault();
                                onSave();
                            }}>
                                {!isSaving ? 'Save' : 'Saving'}
                            </button>
                        </section>          
                    </form> :<div>Loading</div>}
                    </>
                
                </Layout>
                <style jsx>{`
                    #settings {
                        margin-left:42px;
                    }
                    #settings section {
                        margin-top: 26.25px;
                    }
                
                
                `}</style>
        </>
        
    );
}
const Page = () => {
    return (
        <>
            <Settings  />
        </>
    )
}


export default Page;