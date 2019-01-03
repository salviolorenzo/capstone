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
    fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${keys.NewsKey}`
    )
      .then(r => r.json())
      .then(result => {
        let newArray = result.articles.map(item => {
          return {
            source: item.source.name,
            title: item.title,
            url: item.url,
            description: item.description
          };
        });
        this.setState({
          articles: newArray
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
