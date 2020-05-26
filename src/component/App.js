import React, {useState} from 'react';
import './App.scss';
import axios from 'axios';

function App (props) {
  const [count, setCount] = useState (0);
  // let initialData = props.initialData;
  console.log ('initialData props ', props);

  if (props.initialData) {
    console.log ('initialData ', props);
  }

  const increment = () => {
    setCount (count + 1);
  };
  const decrement = () => {
    setCount (count - 1);
  };

  return (
    <div className="wrapper">
      <div className="main">
        <div className="thead">
          <span className="logo">
            <img src="../images/y18.gif" alt="company logo" />
          </span>
          <span className="top-news">
            <a href="" className="selected">top</a>
          </span>
          <span className="seperator" />
          <span className="latest-news"><a href="">new</a></span>
        </div>
        <div className="tbody">
          <div className="row">
            <div className="comment">34</div>
            <div className="t-vote">422</div>
            <div className="votelinks">
              <a href="#"><div className="votearrow" title="upvote" /></a>
            </div>
            <div className="title">
              <span className="title-h2">
                The FBI tracking your browsing history without
                a warrant might be the beginning bbb
              </span>
              <span className="sitebit comhead">
                (<a href="">https://cybernews.com</a>){' '}
              </span>
              <span className="author"> by<span> author </span></span>
              <span className="created">4 hours ago </span>
              <span className="hide">
                [ <span><a href="#">hide</a></span> ]
              </span>
            </div>
          </div>

          <div className="App">
            <p>{count}</p>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>

          </div>

        </div>

        <div className="more-link">
          <span><a href="#">More</a></span>
        </div>
      </div>
    </div>
  );
}

export default App;
