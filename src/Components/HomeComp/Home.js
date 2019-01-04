import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import Weather from '../Tiles/Weather';
import Board_1 from '../Boards/Board_1';
import Board_2 from '../Boards/Board_2';
import Board_3 from '../Boards/Board_3';
import keys from '../../config';

function getWeather(object) {
  let location = {
    lat: object.coords.latitude.toFixed(),
    long: object.coords.longitude.toFixed()
  };
  console.log(location);
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${
      location.long
    }&apikey=${keys.OWKEY}`
  )
    .then(r => r.json())
    .then(result => {
      let weather = {
        condition: result.weather[0].main,
        temp: `Temperature: ${(
          ((result.main.temp - 273.15) * 9) / 5 +
          32
        ).toFixed(2)} °F`,
        high_low: `High: ${(
          ((result.main.temp_max - 273.15) * 9) / 5 +
          32
        ).toFixed(2)} °F Low: ${(
          ((result.main.temp_min - 273.15) * 9) / 5 +
          32
        ).toFixed(2)} °F`,
        // low: `Low: ${(((result.main.temp_min - 273.15) * 9) / 5 + 32).toFixed(
        //   2
        // )} °F`,
        hum: `Humidity: ${result.main.humidity} %`
      };
      this.setState({
        board1: {
          ...this.state.board1,
          weather: weather
        }
      });
    });

  return location;
}

function getRestInfo(object) {
  let location = {
    lat: object.coords.latitude.toFixed(),
    long: object.coords.longitude.toFixed()
  };
  fetch(
    `https://developers.zomato.com/api/v2.1/geocode?lat=${location.lat}&lon=${
      location.long
    }&apikey=${keys.ZOMKEY}`
  )
    .then(r => r.json())
    .then(result => {
      let place = {
        entity_id: result.location.entity_id,
        entity_type: result.location.entity_type
      };
      let nearbyArray = result.nearby_restaurants.map(item => {
        return {
          id: item.restaurant.id,
          name: item.restaurant.name,
          location: item.restaurant.location,
          category: item.restaurant.cuisines,
          price: item.restaurant.price_range,
          avg_rating: item.restaurant.user_rating.aggregate_rating,
          menu: item.restaurant.menu_url,
          type: 'nearby'
        };
      });
      fetch(
        `https://developers.zomato.com/api/v2.1/location_details?entity_id=${
          place.entity_id
        }&entity_type=${place.entity_type}&apikey=${keys.ZOMKEY}`
      )
        .then(r => r.json())
        .then(result_2 => {
          let bestArray = result_2.best_rated_restaurant.map(item => {
            return {
              id: item.restaurant.id,
              name: item.restaurant.name,
              location: item.restaurant.location,
              category: item.restaurant.cuisines,
              price: item.restaurant.price_range,
              avg_rating: item.restaurant.user_rating.aggregate_rating,
              menu: item.restaurant.menu_url,
              type: 'best'
            };
          });
          let restoArray = nearbyArray.concat(bestArray);
          console.log(restoArray);
          this.setState({
            board2: {
              ...this.state.board2,
              restaurants: restoArray
            }
          });
        });
    });
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
      tiles: [],
      board1: {
        tiles: [],
        weather: {},
        news: []
      },
      board2: {
        tiles: [],
        events: [],
        category: 'music',
        restaurants: []
      },
      board3: {
        tiles: []
      }
    };
  }

  componentDidMount() {
    // home component with boards and tiles
    fetch('/home')
      .then(result => result.json())
      .then(array => {
        let newArray = array.map(item => {
          return item.name;
        });
        this.setState({
          tiles: newArray
        });
      });

    // board1 info
    fetch('/home/1')
      .then(r => r.json())
      .then(array => {
        this.setState({
          board1: { ...this.state.board1, tiles: array }
        });
      });

    // weather api call
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(getWeather.bind(this));
      navigator.geolocation.getCurrentPosition(getRestInfo.bind(this));
    } else {
      let object = {
        coords: {
          latitude: 34,
          longitude: -84
        }
      };
      getWeather(object);
    }
    // news api call
    fetch('/home/1/news')
      .then(r => r.json())
      .then(result => {
        console.log(result);
        this.setState({
          board1: {
            ...this.state.board1,
            news: result
          }
        });
      });

    // board 2
    fetch('/home/2')
      .then(r => r.json())
      .then(array => {
        this.setState({
          board2: { ...this.state.board2, tiles: array }
        });
      });

    // events api call
    fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=${
        this.state.board2.category
      }&dmaId=220&apikey=${keys.TMKEY}`
    )
      .then(r => r.json())
      .then(result => {
        let newArray = result._embedded.events.map(event => {
          return {
            name: event.name,
            img: event.images[0].url,
            url: event.url,
            date: event.dates.start.localDate,
            type: event.classifications[0].segment.name,
            subType: event.classifications[0].genre.name
          };
        });
        this.setState({
          board2: { ...this.state.board2, events: newArray }
        });
      });

    // restaurants api call
  }

  handleEventType(item, event) {
    this.setState({
      board2: {
        ...this.state.board2,
        category: item
      }
    });
    fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=${
        this.state.board2.category
      }&dmaId=220&apikey=${keys.TMKEY}`
    )
      .then(r => r.json())
      .then(result => {
        let newArray = result._embedded.events.map(event => {
          return {
            name: event.name,
            img: event.images[0].url,
            url: event.url,
            date: event.dates.start.localDate,
            type: event.classifications[0].segment.name,
            subType: event.classifications[0].genre.name
          };
        });
        this.setState({
          board2: { ...this.state.board2, events: newArray }
        });
      });
  }

  render() {
    return (
      <Router>
        <div className='home'>
          <ul>
            <li>
              <Link to='/home/1'>Daily Briefing</Link>
            </li>
            <li>
              <Link to='/home/2'>Events</Link>
            </li>
            <li>
              <Link to='/home/3'>Transportation</Link>
            </li>
          </ul>
          <Route
            path='/home/1'
            exact
            render={props => {
              return (
                <Board_1
                  weather={this.state.board1.weather}
                  news={this.state.board1.news}
                  {...props}
                />
              );
            }}
          />
          <Route
            path='/home/2'
            exact
            render={props => {
              return (
                <Board_2
                  events={this.state.board2.events}
                  {...props}
                  handleEventType={this.handleEventType.bind(this)}
                />
              );
            }}
          />
          <Route path='/home/3' exact component={Board_3} />
        </div>
      </Router>
    );
  }
}

export default Home;
