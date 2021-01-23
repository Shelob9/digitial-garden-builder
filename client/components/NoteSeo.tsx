import { NextSeo } from 'next-seo';
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { gardenServiceFactory } from "services/factory";
import { INote } from '../../types';
import { useNoteSettings } from './useNotes';

export const NoteSeo: FC<{ note: INote }> = ({ note })=> {
  let description = note.content ? note.content.substring(0, 240) : '';
  let { authorName } = useNoteSettings();
  return (
    <NextSeo
        title={note.title}
        description={description}
        //canonical="https://www.canonical.ie/"
        openGraph={{
          //url: 'https://www.url.ie/a',
          title: note.title,
          description: `Notes about ${note.title} ${authorName ? `by ${authorName}`:''}`
        }}
      />
  )
}