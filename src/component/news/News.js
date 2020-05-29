import React from 'react';
import List from '../list/List';
import axios from 'axios';
import Header from '../header/Header';
import Pagination from '../pagination/Pagination';
import {canUseDOM} from '../../utility';
import './news.scss';

class News extends React.Component {
  constructor (props) {
    super (props);

    let initialData, storedHideIds, voteObj;

    if (canUseDOM ()) {
      storedHideIds = JSON.parse (localStorage.getItem ('hideIds'));
      voteObj = JSON.parse (localStorage.getItem ('voteObj'));
    }

    this.hideIds = storedHideIds || [];
    this.voteObj = voteObj || {};

    if (props.staticContext) {
      initialData = props.staticContext.initialData;
    } else {
      initialData = window.__initialData__;

      delete window.__initialData__;
    }

    this.state = {
      news: initialData && initialData.hits,
      totalPages: initialData && initialData.nbPages, // index start from 0
      currentPage: 0,
    };
    this.searchTerm = this.searchTerm.bind (this);
  }

  static requestInitialData () {
    return axios
      .get ('https://hn.algolia.com/api/v1/search?tags=front_page', {})
      .then (response => {
        return response.data;
      });
  }
  componentDidMount () {
    News.requestInitialData ().then (news => {
      news = news.hits;
      let filteredNews = news.filter (
        item => this.hideIds.indexOf (item.objectID) === -1
      );

      let votedNews = filteredNews.map (item => {
        if (this.voteObj[item.objectID]) {
          item.points = this.voteObj[item.objectID];
          item.hide = true;
        }
        return item;
      });
      this.setState ({
        news: votedNews,
      });
    });
  }

  nextPage = pageNumber => {
    axios
      .get (
        `https://hn.algolia.com/api/v1/search?tags=front_page&page=${pageNumber}`,
        {}
      )
      .then (response => {
        this.setState ({news: response.data.hits, currentPage: pageNumber});
      });
  };

  searchTerm (term) {
    let queryParam = '';

    if (term === 'new') {
      // queryParam = 'search_by_date?tags=story';
      queryParam = 'search_by_date?tags=front_page';
    } else {
      queryParam = 'search?tags=front_page';
    }

    // search call based on top and latest news query
    axios
      .get (`https://hn.algolia.com/api/v1/${queryParam}`, {})
      .then (response => {
        this.setState ({
          news: response.data.hits,
          totalPages: response.data.nbPages,
        });
      });
  }

  hideNewsItems = (e, id) => {
    e.preventDefault ();

    this.hideIds.push (id);
    localStorage.setItem ('hideIds', JSON.stringify (this.hideIds));
    const news = this.state.news;

    const filteredNews = news.filter (item => item.objectID !== id);

    this.setState ({
      news: filteredNews,
    });
  };

  onVoteCast = (e, id, points, voteState) => {
    if ('upvote' === voteState) {
      this.voteObj[id] = ++points;
      localStorage.setItem ('voteObj', JSON.stringify (this.voteObj));
    }
    if ('unvote' === voteState) {
      delete this.voteObj[id];
      localStorage.setItem ('voteObj', JSON.stringify (this.voteObj));
    }

    const {news} = this.state;
    const votedNews = news.map (item => {
      if (id === item.objectID) {
        if ('upvote' === voteState) {
          item.points = this.voteObj[id];
          item.hide = true;
        } else {
          item.points = --points;
          item.hide = false;
        }
      }
      return item;
    });

    this.setState ({
      news: votedNews,
    });
  };

  render () {
    const {news} = this.state;

    return (
      <div className="main">
        <div className="main-wrapper">
          <Header search={this.searchTerm} val1="top" val2="new" />
          <List
            news={news}
            hideNewsItems={this.hideNewsItems}
            onVoteCast={this.onVoteCast}
          />
          {this.state.totalPages > 0
            ? <Pagination
                pages={this.state.totalPages}
                nextPage={this.nextPage}
                currentPage={this.state.currentPage}
              />
            : ''}

        </div>
      </div>
    );
  }
}

export default News;
