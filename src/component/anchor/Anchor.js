import React from 'react';

const Anchor = props => {

  const callSearchFunction = e => {
    // console.log ('ee ', e);
    e.preventDefault ();
    props.search (props.text);
    // console.log("term ", props.text);
  };

  return (
    <div>
      <span className="news-link">
        <a
          href="#"
          className="selected"
          onClick={callSearchFunction}
          //   onChange={e => {
          //     setAnchorName (props.text);
          //   }}
        >
          {props.text}
        </a>
      </span>
    </div>
  );
};

export default Anchor;
