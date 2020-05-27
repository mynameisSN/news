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
  // console.log ('newslist item ', news && news);

  const renderList = news.map ((item, index) => {
    // const dateFind = date => {
    //   const str = date;
    //   const res = str.split ('T');
    //   const endDate = res[0].split('-');

    //   console.log ('date ', date);
    //   let now = moment (new Date ()); //todays date
    //   let end = moment (res[0]); // another date
    //   var duration = moment.duration (now.diff (end));
    //   var days = duration.asDays ();
    //   moment (end).fromNow ();
    //   console.log (moment ([date]).fromNow ());

    //   console.log (days);
    // };
    return (
      <div className="row" key={`item-${index}`}>
        <div className="comment">{item.num_comments}</div>
        <div className="t-vote">{item.points}</div>
        <div className="votelinks">
          <a href="#">
            <div className="votearrow" title="upvote" />
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

  return <div>{renderList}</div>;
};

export default List;
