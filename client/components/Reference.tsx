import React, { FC } from "react";
import { NoteReference } from "../lib/findReferences";
import { notePostions } from "./noteLayoutReducer";

import NoteMarkdownLink from './NoteMarkdownLink';
import { useSingleNote } from "./useNotes";
const Reference: FC<{
  reference: NoteReference,
  openPosition: notePostions
}> = ({ reference,openPosition }) => {
  let { note } = useSingleNote({ slug: reference.slug });
 
  return (
    <div>
      <NoteMarkdownLink 
        href={reference.url}
        className="reference"
        openPosition={openPosition}
      >
          {note ? note.title : reference.slug}
      </NoteMarkdownLink>
    </div>
  );
};

export default Reference;
