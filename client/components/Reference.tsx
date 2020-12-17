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
      <style jsx>{`
        .reference {
          text-decoration: none;
        }
        
        .reference:hover {
          color: var(--references-highlight);
        }
        
        .reference > div {
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }
        
        .reference > div > p {
          margin: 0;
          font-size: 0.875rem;
        }
        
        .reference > div > ul {
          margin: 0;
        }
        
      `}</style>
    </div>
  );
};

export default Reference;
