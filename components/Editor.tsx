import Link from 'next/link';
import React,{ FC, forwardRef,  useRef, useState } from 'react';
import CmsLayout from './CmsLayout';
import { TextInput, TextInputProps } from './FieldAreas';
import MarkdownEditor from './MarkdownEditor';



const TitleField: FC<TextInputProps> = forwardRef((props, ref) => (
    <TextInput {...{
        ...props,
        required: true,
    }}
        //@ts-ignore
        ref={ref}
    />
));


export type saveData = { content: string, filePath: string };
export type editorProps = {
    onSave: (update: saveData) => Promise<any>;
    initialPath?: string;
    initialContent?: string;
    name?: string;
};

const Editor : FC<editorProps> = ({onSave,initialPath,initialContent,name}) => {
    let filePathRef = useRef<HTMLInputElement>();
    const [content, setContent] = useState(initialContent);
    const [isSaving, setISaving] = useState(false);
    const saveHandler = () => {
        setISaving(true);
        onSave({
            content,
            filePath:filePathRef.current.value
        }).then(() => {
            setISaving(false);
        })
    }
    return (
        <CmsLayout TopBar={() => (
            <>
                <button title={'Save'} onClick={saveHandler} className={'btn-primary'}>
                    {!isSaving ? 'Save' : <span className={'animate-spin h-5 w-5 mr-3'}>Saving</span>}
                </button>
                {name && <Link href={`/${name}`}>
                        View
                </Link>
                }
            </>
        )}>
            <TextInput
                label={'File Name'}
                ref={filePathRef}
                id={'file-name'}
                defaultValue={initialPath}
                disabled={isSaving}
            />
            <MarkdownEditor
                value={content}
                setValue={isSaving ? () => { } : setContent}
            /> 
        </CmsLayout>
    )
}

export default Editor;
  
