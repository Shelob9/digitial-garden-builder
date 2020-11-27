import React from "react";
import Reference from "./reference";

import "./ReferenceBlocks.module.css";

const ReferencesBlock = ({ references }) => {
  if (!references.length) {
    return null;
  }

  return (
    <div className="references-block">
      <h3>Referred in</h3>
      <div>
        {references.map((reference) => (
          <Reference reference={reference} key={reference.id} />
        ))}
      </div>
    </div>
  );
};

export default ReferencesBlock;
