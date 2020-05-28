import React from 'react';
import List from '../list/List';
import axios from 'axios';
import Header from '../header/Header';
import Pagination from '../pagination/Pagination';
// import Anchor from '../anchor/Anchor';
import './news.scss';

class News extends React.Component {
  constructor (props) {
    super (props);
    // this.newsData = this.newsData.bind (this);
    let initialData;
    if (props.staticContext) {
      initialData = props.staticContext.initialData;
    } else {
      initialData = window.__initialData__;
      delete window.__initialData__;
    }
    this.state = {
      news: initialData.hits,
      totalPages: initialData.nbPages, // index start from 0
      currentPage: 0,
      // searchQuery: '',
    };
    this.searchTerm = this.searchTerm.bind (this);
  }

  nextPage = pageNumber => {
    axios
      .get (
        `https://hn.algolia.com/api/v1/search?page=${pageNumber}`,
        {}
      )
      .then (response => {
        console.log ('top new response ', response.data.hits);
        // if (response.data.hits) {
        this.setState ({news: response.data.hits, currentPage: pageNumber});
        // return response.data.hits;
        // }
      });
  };

  searchTerm (term) {
    console.log ('Search term ', term);
    let queryParam = '';

    if (term === 'new') {
      queryParam = 'search_by_date?tags=story';
    } else {
      queryParam = 'search';
    }

    console.log ('searchQuery ', queryParam);
    // search call based on top and latest news query
    axios
      .get (`https://hn.algolia.com/api/v1/${queryParam}`, {})
      .then (response => {
        console.log ('top new response ', response.data.hits);
        // if (response.data.hits) {
        this.setState ({
          news: response.data.hits,
          totalPages: response.data.nbPages,
        });
        // return response.data.hits;
        // }
      });
  }

  static requestInitialData () {
    return axios
      .get ('https://hn.algolia.com/api/v1/search', {})
      .then (response => {
        return response.data;
      });
  }

  render () {
    const {news} = this.state;
    console.log ('this.state.totalPages ', this.state.totalPages);

    return (
      <div className="main">
        <div className="main-wrapper">
          <Header search={this.searchTerm} val1="top" val2="new" />
          <List news={news} />
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
