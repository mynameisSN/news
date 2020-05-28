import React from 'react';
import {extractDomain} from '../../utility';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addLocale (en);
const timeAgo = new TimeAgo ('en-US');

const List = props => {
  const {news} = props;

  if (!news) {
    return null;
  }

  const renderList = news.map ((item, index) => {
    return (
      <div className="row" key={`item-${index}`}>
        <div className="comment">{item.num_comments}</div>
        <div className="t-vote">{item.points}</div>
        <div className="vote">
          <a href="#">
            <div className="vote-arrow" title="upvote" />
          </a>
        </div>
        <div className="title">
          <span className="title-h2">
            {item.title}
          </span>
          <span className="sitebit comhead">
            {' '}
            (
            <a href={item.url && item.url}>
              {item.url && extractDomain (item.url)}
            </a>
            )
            {' '}
          </span>
          <span className="author">
            by
            <span> {item.author} </span>
          </span>
          <span className="created">
            {timeAgo.format (new Date (item.created_at), 'time')} ago{' '}
          </span>
          <span className="hide">
            [ <span><a href="#">hide</a></span> ]
          </span>
        </div>
      </div>
    );
  });

  return <div className="tbody">{renderList}</div>;
};

export default List;
