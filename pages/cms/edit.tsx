import * as React from 'react';
import Editor, { saveData } from '../../components/Editor';
import { useLocalGitApi } from '../../hooks/useLocalGitApi';
import getRepo from '../../lib/getRepo';
import GitApi from '../../lib/GitApi';

const Edit = ({ name, path, content,repo }) => {
    const { fetchGitSave } = useLocalGitApi();
    const onSave = async (data:saveData) => {
        return fetchGitSave({
            content: data.content,
            filePath: data.filePath,
            repo
        });
    }
    return (
        <Editor name={name.replace('.md', '')} onSave={onSave} initialContent={content} initialPath={path} /> 
    )
}

export async function getServerSideProps({ query }) {

    let { name, path } = query;
    let content = '';
    let repo = getRepo();
    if (name && path) {
        let git = GitApi(repo, "master");
        try {
            let file = await git.getFile(path);
            content = file.content;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    return {
        props: { name, path,content,repo },
    }
  }
  
export default Edit;