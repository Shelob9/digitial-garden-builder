import React, { FC } from "react";
import { NoteReferences } from "../lib/findReferences";
import { notePostions } from "./noteLayoutReducer";
import Reference from "./Reference";
const ReferencesBlock: FC<{
  references: NoteReferences;
  openPosition: notePostions

}> = ({ references,openPosition}) => {
  if (!references.length) {
    return null;
  }

  return (
    <div className="references-block">
      <h3>Linked Notes</h3>
      <div>
        {references.map((reference) => (
          <Reference
            reference={reference}
            key={reference.slug}
            openPosition={openPosition} />
        ))}
      </div>
    </div>
  );
};

export default ReferencesBlock;
