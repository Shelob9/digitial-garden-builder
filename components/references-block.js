import React from "react";
import Reference from "./reference";
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
      <style jsx>{`
        .references-block {
          color: var(--references-text);
          padding: 1rem;
          margin: 1rem 0;
          border-radius: 0.5rem;
          background-color: var(--references-bg);
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .references-block > div {
          margin-bottom: 1rem;
        }

        .references-block > hr {
          margin-left: auto;
          margin-right: auto;
          width: 8rem;
        }

        .references-block a {
          color: var(--references-text);
          transition: color 0.3s ease;
        }

        .references-block > p:last-child {
          margin-bottom: 0;
        }

      `}</style>
    </div>
  );
};

export default ReferencesBlock;
