import * as React from 'react';
import Editor, { saveData } from '../../components/Editor';
import { useLocalGitApi } from '../../hooks/useLocalGitApi';
import getRepo from '../../lib/getRepo';
const repo = getRepo();

const New = () => {
    const { fetchGitSave } = useLocalGitApi();
    const onSave = async (data:saveData) => {
        return fetchGitSave({
            content: data.content,
            filePath: data.filePath,
            repo
        })
     }
    return (
        <Editor onSave={onSave}  /> 
    )
}


export default New;