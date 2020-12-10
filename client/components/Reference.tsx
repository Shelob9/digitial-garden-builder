import React, { FC } from "react";
import { NoteReference } from "../lib/findReferences";
import { notePostions } from "./noteLayoutReducer";

import NoteLink from './NoteLink';
import { useSingleNote } from "./useNotes";
const Reference: FC<{
  reference: NoteReference,
  openPosition: notePostions
}> = ({ reference,openPosition }) => {
  let { note } = useSingleNote({ slug: reference.slug });
 
  return (
    <div>
      <NoteLink slug={reference.slug}
        href={reference.url}
        className="reference"
      >
          {note ? note.title : reference.slug}
      </NoteLink>
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
