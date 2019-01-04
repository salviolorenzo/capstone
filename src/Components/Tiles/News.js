import React from 'react';
const keys = require('../../config');

function News(props) {
  return (
    <div className='news tile '>
      <h3>News</h3>
      <ul className='newsList'>
        {props.news.map((item, index) => {
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

export default News;
