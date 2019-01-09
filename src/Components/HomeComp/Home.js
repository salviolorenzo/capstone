import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import SwipeableRoutes from 'react-swipeable-routes';
import moment from 'moment';
// import Weather from '../Tiles/Weather';
import Board_1 from '../Boards/Board_1';
import Board_2 from '../Boards/Board_2';
import Board_3 from '../Boards/Board_3';
import Settings from '../Settings/SettingComp';
import Header from '../Header';

import keys from '../../config';
import day from '../../images/weather_icons/animated/day.svg';
import cloudy from '../../images/weather_icons/animated/cloudy.svg';
import rainyDay from '../../images/weather_icons/animated/rainy-3.svg';
import rainy from '../../images/weather_icons/animated/rainy-6.svg';
import snow from '../../images/weather_icons/animated/snowy-6.svg';
import thunder from '../../images/weather_icons/animated/thunder.svg';

function createBackSplash(url) {
  const style = {
    backgroundImage: `url(${url})`,
    backgroundSize: `cover`,
    backgroundPosition: `center`,
    backgroundAttachment: `fixed`
  };
  return style;
}

function weatherIcon(string) {
  switch (string) {
    case 'clear sky':
      return day;
    case 'few clouds':
      return cloudy;
    case 'scattered clouds':
      return cloudy;
    case 'broken clouds':
      return cloudy;
    case 'shower rain':
      return rainy;
    case 'rain':
      return rainyDay;
    case 'thunderstorm':
      return thunder;
    case 'snow':
      return snow;
    case 'mist':
      return cloudy;
    default:
      return cloudy;
  }
}

function getWeather(object) {
  let location = {
    lat: object.coords.latitude.toFixed(4),
    long: object.coords.longitude.toFixed(4)
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
        coords: { lat: location.lat, long: location.long },
        board1: {
          ...this.state.board1,
          weather: weather,
          weatherIcon: weatherIcon(result.weather[0].description)
        }
      });
    });

  return location;
}

function getRestInfo(object) {
  let location = {
    lat: object.coords.latitude.toFixed(4),
    long: object.coords.longitude.toFixed(4)
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
      coords: {},
      tiles: [],
      userInfo: {},
      bgUrl: '',
      board1: {
        tiles: [],
        weather: {},
        weatherIcon: '',
        news: {
          articles: [],
          queryTerm: ''
        },
        calendar: {
          selectedEvent: {},
          modalIsOpen: false,
          term: '',
          desc: ' ',
          start: '',
          end: '',
          allDay: false,
          events: []
        }
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
        this.setState({
          board1: {
            ...this.state.board1,
            calendar: {
              ...this.state.board1.calendar,
              events: array
            }
          }
        });
      });

    fetch('/home/settings')
      .then(r => r.json())
      .then(object => {
        this.setState({
          userInfo: object
        });
      });

    // // board1 info
    // fetch('/home/1')
    //   .then(r => r.json())
    //   .then(array => {
    //     this.setState({
    //       board1: { ...this.state.board1, tiles: array }
    //     });
    //   });

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
      getRestInfo(object);
    }
    // news api call
    fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${keys.NEWSKEY}`
    )
      .then(r => r.json())
      .then(result => {
        console.log(result);
        let newArray = result.articles.map(item => {
          return {
            source: item.source.name,
            title: item.title,
            url: item.url,
            description: item.description
          };
        });
        this.setState({
          board1: {
            ...this.state.board1,
            news: {
              ...this.state.board1.news,
              articles: newArray
            }
          }
        });
      });

    // board 2
    // fetch('/home/2')
    //   .then(r => r.json())
    //   .then(array => {
    //     this.setState({
    //       board2: { ...this.state.board2, tiles: array }
    //     });
    //   });

    // events api call
    fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=${
        this.state.board2.category
      }&dmaId=220&apikey=${keys.TMKEY}`
    )
      .then(r => r.json())
      .then(result => {
        console.log(result);
        let newArray = result._embedded.events.map(event => {
          return {
            name: event.name,
            img: event.images[0].url,
            url: event.url,
            date: event.dates.start.localDate,
            type: event.classifications[0].segment.name,
            subType: event.classifications[0].genre.name,
            venue: event._embedded.venues[0]
          };
        });
        this.setState({
          board2: { ...this.state.board2, events: newArray }
        });
      });
    fetch(
      `https://api.unsplash.com/search/photos?query=space&client_id=${
        keys.USKEY
      }`
    )
      .then(r => r.json())
      .then(object => {
        console.log(object);
        let ranNum = Math.floor(Math.random() * 9);
        this.setState({
          bgUrl: object.results[ranNum].urls.regular
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

  displayEvent(event) {
    console.log(event.id);
    const newEvent = {
      id: event.id,
      title: event.title,
      allDay: event.allDay,
      start: moment(event.start.toLocaleString()).format('MM-DD-YYYY HH:mm:ss'),
      end: moment(event.end.toLocaleString()).format('MM-DD-YYYY HH:mm:ss'),
      desc: event.desc
    };
    console.log(newEvent);
    this.setState(
      {
        board1: {
          ...this.state.board1,
          calendar: {
            ...this.state.board1.calendar,
            selectedEvent: newEvent,
            term: newEvent.title,
            desc: newEvent.desc,
            start: newEvent.start,
            end: newEvent.end
          }
        }
      },
      this.openModal
    );
  }

  openModal() {
    this.setState({
      board1: {
        ...this.state.board1,
        calendar: {
          ...this.state.board1.calendar,
          modalIsOpen: true
        }
      }
    });
  }

  afterOpenModal() {
    console.log('opened');
  }

  closeModal() {
    this.setState({
      board1: {
        ...this.state.board1,
        calendar: {
          ...this.state.board1.calendar,
          modalIsOpen: false,
          selectedEvent: {},
          term: '',
          desc: ''
        }
      }
    });
  }

  onSlotChange(slotInfo) {
    const startDate = moment(slotInfo.start.toLocaleString()).format(
      'MM-DD-YYYY HH:mm:ss'
    );
    const endDate = moment(slotInfo.end.toLocaleString()).format(
      'MM-DD-YYYY HH:mm:ss'
    );
    const newEvent = {
      title: this.state.board1.calendar.term,
      allDay: false,
      start: startDate,
      end: endDate,
      description: this.state.board1.calendar.desc
    };
    this.setState({
      board1: {
        ...this.state.board1,
        calendar: {
          ...this.state.board1.calendar,
          selectedEvent: newEvent,
          start: newEvent.start,
          end: newEvent.end
        }
      }
    });
    this.openModal();
  }

  handleNewEvent(event) {
    event.preventDefault();
    const newEvent = {
      id: this.state.board1.calendar.selectedEvent.id,
      title: this.state.board1.calendar.term,
      allDay: this.state.board1.calendar.allDay,
      start: this.state.board1.calendar.start,
      end: this.state.board1.calendar.end,
      description: this.state.board1.calendar.desc
    };

    console.log(newEvent);
    fetch('/home/events/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEvent)
    })
      .then(r => r.json())
      .then(result => {
        console.log(result);
        const addEvent = {
          id: result.id,
          title: result.title,
          allday: result.allDay,
          eventstart: result.eventStart,
          eventend: result.eventEnd,
          description: result.description
        };
        this.setState(
          {
            board1: {
              ...this.state.board1,
              calendar: {
                ...this.state.board1.calendar,
                events: [...this.state.board1.calendar.events, addEvent],
                selectedEvent: {}
              }
            }
          },
          this.closeModal
        );
      });
  }

  handleDelete(e) {
    e.preventDefault();
    fetch(
      `/home/events/${this.state.board1.calendar.selectedEvent.id}/delete`,
      {
        method: 'POST'
      }
    )
      .then(r => r.json())
      // .then(console.log);
      .then(res => {
        this.setState({
          board1: {
            ...this.state.board1,
            calendar: {
              ...this.state.board1.calendar,
              events: res,
              selectedEvent: {}
            }
          }
        });
      });
    this.closeModal();
  }

  handleTitleChange(event) {
    this.setState({
      board1: {
        ...this.state.board1,
        calendar: {
          ...this.state.board1.calendar,
          term: event.target.value
        }
      }
    });
  }

  handleDescChange(event) {
    this.setState({
      board1: {
        ...this.state.board1,
        calendar: {
          ...this.state.board1.calendar,
          desc: event.target.value
        }
      }
    });
  }

  handleStartTime(event) {
    this.setState({
      board1: {
        ...this.state.board1,
        calendar: {
          ...this.state.board1.calendar,
          start: event.target.value
        }
      }
    });
  }

  handleEndTime(event) {
    this.setState({
      board1: {
        ...this.state.board1,
        calendar: {
          ...this.state.board1.calendar,
          end: event.target.value
        }
      }
    });
  }

  changeBox(event) {
    this.setState({
      board1: {
        ...this.state.board1,
        calendar: {
          ...this.state.board1.calendar,
          allDay: event.target.checked
        }
      }
    });
  }

  handleQueryTerm(event) {
    this.setState({
      board1: {
        ...this.state.board1,
        news: {
          ...this.state.board1.news,
          queryTerm: event.target.value
        }
      }
    });
    console.log(event.target.value);
  }

  // NEWS QUERY
  handleNewsSearch(event) {
    event.preventDefault();
    if (this.state.board1.news.queryTerm) {
      fetch(
        `https://newsapi.org/v2/top-headlines?q=${
          this.state.board1.news.queryTerm
        }&apiKey=${keys.NEWSKEY}`
      )
        .then(r => r.json())
        .then(result => {
          console.log(result);
          let newArray = result.articles.map(item => {
            return {
              source: item.source.name,
              title: item.title,
              url: item.url,
              description: item.description
            };
          });
          this.setState({
            board1: {
              ...this.state.board1,
              news: {
                ...this.state.board1.news,
                articles: newArray
              }
            }
          });
        });
    } else {
      return null;
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className='home' style={createBackSplash(this.state.bgUrl)}>
          <ul className='navList'>
            <li>
              <NavLink
                activeStyle={{
                  borderBottom: '1px solid white',
                  paddingBottom: '3px'
                }}
                to='/home/dash1'
              >
                Daily Briefing
              </NavLink>
            </li>
            <li>
              <NavLink
                activeStyle={{
                  borderBottom: '1px solid white',
                  paddingBottom: '3px'
                }}
                to='/home/dash2'
              >
                Events
              </NavLink>
            </li>
            <li>
              <NavLink
                activeStyle={{
                  borderBottom: '1px solid white',
                  paddingBottom: '3px'
                }}
                to='/home/dash3'
              >
                Transportation
              </NavLink>
            </li>
          </ul>
          <SwipeableRoutes>
            <Route
              path='/home/settings'
              render={props => {
                return <Settings user={this.state.userInfo} {...props} />;
              }}
            />
            <Route
              path='/home/dash1'
              exact
              render={props => {
                return (
                  <Board_1
                    weather={this.state.board1.weather}
                    icon={this.state.board1.weatherIcon}
                    news={this.state.board1.news.articles}
                    events={this.state.board1.calendar.events}
                    allDay={this.state.board1.calendar.allDay}
                    selectedEvent={this.state.board1.calendar.selectedEvent}
                    modalIsOpen={this.state.board1.calendar.modalIsOpen}
                    term={this.state.board1.calendar.term}
                    desc={this.state.board1.calendar.desc}
                    start={this.state.board1.calendar.start}
                    end={this.state.board1.calendar.end}
                    displayEvent={this.displayEvent.bind(this)}
                    openModal={this.openModal.bind(this)}
                    afterOpenModal={this.afterOpenModal.bind(this)}
                    closeModal={this.closeModal.bind(this)}
                    onSlotChange={this.onSlotChange.bind(this)}
                    handleNewEvent={this.handleNewEvent.bind(this)}
                    handleDelete={this.handleDelete.bind(this)}
                    handleTitleChange={this.handleTitleChange.bind(this)}
                    handleDescChange={this.handleDescChange.bind(this)}
                    handleStartTime={this.handleStartTime.bind(this)}
                    handleEndTime={this.handleEndTime.bind(this)}
                    changeBox={this.changeBox.bind(this)}
                    handleNewsSearch={this.handleNewsSearch.bind(this)}
                    queryTerm={this.state.board1.news.queryTerm}
                    handleQueryTerm={this.handleQueryTerm.bind(this)}
                    {...props}
                  />
                );
              }}
            />
            <Route
              path='/home/dash2'
              exact
              render={props => {
                return (
                  <Board_2
                    events={this.state.board2.events}
                    {...props}
                    handleEventType={this.handleEventType.bind(this)}
                    restaurants={this.state.board2.restaurants}
                  />
                );
              }}
            />
            <Route
              path='/home/dash3'
              exact
              render={props => {
                return (
                  <Board_3
                    coords={this.state.coords}
                    markers={this.state.board2.restaurants}
                    events={this.state.board2.events}
                    {...props}
                  />
                );
              }}
            />
          </SwipeableRoutes>
        </div>
      </>
    );
  }
}

export default Home;
