import React from 'react';

const Anchor = props => {
  const callSearchFunction = e => {
    e.preventDefault ();
    props.search (props.text);
  };

  return (
    <div className="header-link">
      <a href="#" className="selected" onClick={callSearchFunction}>
        {props.text}
      </a>
    </div>
  );
};

export default Anchor;
