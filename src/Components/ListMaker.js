import React from 'react';

function ListMaker(props) {
  return (
    <ul className='list'>
      {props.items.map((item, index) => {
        return (
          <li
            key={index}
            onClick={event => {
              props.handleClick(event, item);
            }}
          >
            {item.name}
          </li>
        );
      })}
    </ul>
  );
}

export default ListMaker;
