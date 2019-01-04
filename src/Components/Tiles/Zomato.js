import React from 'react';

function Zomato(props) {
  return (
    <div className='tile restoTile'>
      <h3>Places to eat</h3>
      <ul className='newsList'>
        {props.restaurants.map(item => {
          return (
            <li>
              {item.name}
              <br />
              {`${item.location.address}, ${item.location.city}`}
              <br />
              <a href={item.menu} target='_blank' rel='noreferrer'>
                Menu
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Zomato;
