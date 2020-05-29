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
    const hideItemFromView = e => {
      e.preventDefault ();
      props.hideNewsItems (e, item.objectID);
    };
    return (
      <div className="row" key={`item-${index}`}>
        <div className="comment">{item.num_comments}</div>
        <div className="t-vote">{item.points}</div>
        {!item.hide &&
          <div className="vote">
            <a
              href="#"
              onClick={e =>
                props.onVoteCast (e, item.objectID, item.points, 'upvote')}
            >
              <div className="vote-arrow" title="upvote" />
            </a>
          </div>}
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
            [ <span>
              <a href="#" onClick={hideItemFromView}>
                hide
              </a>
            </span> ]
            {item.hide &&
              <span className="unvote">
                {' '}
                <a
                  href="#"
                  onClick={e =>
                    props.onVoteCast (e, item.objectID, item.points, 'unvote')}
                >
                  unvote
                </a>
              </span>}
          </span>
        </div>
      </div>
    );
  });

  return <div className="tbody">{renderList}</div>;
};

export default List;
