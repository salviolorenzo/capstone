import React from 'react';

function Zomato(props) {
  return (
    <div className="tile restoTile">
      <h3>Places to eat</h3>
      <ul className="restoList">
        {props.restaurants.map((item, index) => {
          return (
            <li key={index}>
              <h4>{item.name}</h4>
              <div>
                {`${item.location.address}, ${item.location.city}`}
                <br />
                {`Rating: ${item.avg_rating}/5`}
                <br />
                {`Pricing: ${item.price}/4`}
              </div>

              <button className="menuLink">
                <a href={item.menu} target="_blank" rel="noreferrer noopener">
                  Menu
                </a>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Zomato;
