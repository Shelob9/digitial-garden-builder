import React from "react";

import NoteLink from './NoteLink';
const Reference = ({ reference }) => {
  console.log(reference);
  return (
    <div>
      <NoteLink slug={reference.slug} className="reference">
          {reference.title}
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
