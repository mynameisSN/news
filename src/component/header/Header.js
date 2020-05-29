import React from 'react';
import Anchor from '../anchor/Anchor';

const Header = props => {
  return (
    <div className="thead">
      <span className="logo">
        <img src="./images/y18.gif" alt="logo" />
      </span>
      <Anchor text={props.val1} search={props.search} />

      <span className="thead-seperator" />
      <Anchor text={props.val2} search={props.search} />

    </div>
  );
};

export default Header;
