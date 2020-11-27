import React, { FC } from 'react';
import DropdownCombobox, { selectItems } from '../../components/DropdownCombobox';
import {getRepos} from '../../lib/GitApi';

const Repo: FC<{ repos: selectItems }> = ({ repos }) => {
    let onSave = (repo) => {
        let split = repo.label.split('/');
        console.log({ owner: split[0], repo: split[1] });
     };
    return <div>
        <DropdownCombobox items={repos} onSave={onSave} />
        <p>This does not do anything besides log the selected repo to the console.</p>
    </div>
}

export async function getStaticProps() {
    let data = await getRepos();
    //@ts-ignore
    let repos = data.data.map(repo => {
        return {
            id: repo.id,
            label: repo.full_name
        }
    })
    return { props: { repos} }
}
  
export default Repo;
