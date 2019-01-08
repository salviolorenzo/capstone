import React from 'react';

function News(props) {
  return (
    <div className='news tile '>
      <h3>News</h3>
      <form
        className='newsSearch'
        onSubmit={event => {
          props.handleNewsSearch(event);
        }}
      >
        <input
          type='text'
          name='search'
          value={props.queryTerm}
          onChange={event => {
            props.handleQueryTerm(event);
          }}
        />
        <input type='submit' value='Search' />
      </form>
      <ul className='newsList'>
        {props.news.map((item, index) => {
          return (
            <li key={index}>
              <a href={item.url} rel='norefferer noopener'>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default News;
