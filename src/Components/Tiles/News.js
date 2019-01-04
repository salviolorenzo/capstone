import React, { Component } from 'react';
const keys = require('../../config');

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    fetch('/home/1/news')
      .then(r => r.json())
      .then(result => {
        this.setState({
          articles: result
        });
      });
  }

  render() {
    return (
      <div className='news tile '>
        <h3>News</h3>
        <ul className='newsList'>
          {this.state.articles.map((item, index) => {
            return (
              <li key={index}>
                <a href={item.url}>{item.title}</a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default News;
