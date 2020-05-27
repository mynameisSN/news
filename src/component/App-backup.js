import React from 'react';
import List from './list/List';
import axios from 'axios';
import Anchor from './anchor/Anchor';
import './App.scss';

class App extends React.Component {
  constructor (props) {
    super (props);
    // this.newsData = this.newsData.bind (this);
    let initialData;
    if (props.initialData) {
      initialData = props.initialData;
    } else {
      initialData = window.__initialData__;
      delete window.__initialData__;
    }
    this.state = {
      news: initialData,
      searchQuery: '',
    };
    this.searchTerm = this.searchTerm.bind (this);
  }

  searchTerm (term) {
    console.log ('Search term ', term);
    let queryParam = '';

    if (term === 'new') {
      queryParam = 'search_by_date?tags=story';
    }
    if (term === 'top') {
      queryParam = 'search?tags=front_page';
    }

    console.log ('queryParam ', queryParam);
    this.setState ({searchQuery: queryParam});
    axios
      .get (`https://hn.algolia.com/api/v1/${this.state.searchQuery}`, {})
      .then (response => {
        console.log ('queryParam2 ', response.data.hits);
        if (response.data.hits) {
          this.setState ({news: response.data.hits});
          // return response.data.hits;
        }
      });
  }

  static requestInitialData () {
    return axios
      .get ('https://hn.algolia.com/api/v1/search?tags=front_page', {})
      .then (response => {
        return response.data.hits;
      });
  }

  render () {
    const {news} = this.state;

    return (
      <div className="App">
        <h1>App</h1>

        <div className="wrapper">
          <div className="main">

            <div className="thead">
              <span className="logo">
                <img src="./images/y18.gif" alt="logo" />
              </span>
              <Anchor text="top" search={this.searchTerm} />

              <span className="seperator" />
              <Anchor text="new" search={this.searchTerm} />

            </div>

            <div className="tbody">
              {<List news={news} />}

            </div>

            <div className="more-link">
              <span><a href="#">More</a></span>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
