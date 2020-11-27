import React from "react";

import "./Reference.module.css";
import NoteLink from './NoteLink';
const Reference = ({ reference }) => {
  return (
    <div>
      <NoteLink to={reference.slug} className="reference">
        <div>
          <h5>{reference.title}</h5>
            {reference.content}
        </div>
      </NoteLink>
    </div>
  );
};

export default Reference;
