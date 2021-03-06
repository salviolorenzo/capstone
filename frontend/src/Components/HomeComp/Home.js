import React, { Component, Suspense } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import SwipeableRoutes from 'react-swipeable-routes';
import moment from 'moment';
import keys from '../../config';
// import day from '../../images/weather_icons/animated/day.svg';
// import cloudy from '../../images/weather_icons/animated/cloudy.svg';
// import rainyDay from '../../images/weather_icons/animated/rainy-3.svg';
// import rainy from '../../images/weather_icons/animated/rainy-6.svg';
// import snow from '../../images/weather_icons/animated/snowy-6.svg';
// import thunder from '../../images/weather_icons/animated/thunder.svg';
const Settings = React.lazy(() => import('../Settings/SettingComp'));
const Header = React.lazy(() => import('../Header'));
const Board_1 = React.lazy(() => import('../Boards/Board_1'));
const Board_2 = React.lazy(() => import('../Boards/Board_2'));
const Board_3 = React.lazy(() => import('../Boards/Board_3'));

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
      return '/images/weather_icons/animated/day.svg';
    case 'few clouds':
      return '/images/weather_icons/animated/cloudy.svg';
    case 'scattered clouds':
      return '/images/weather_icons/animated/cloudy.svg';
    case 'broken clouds':
      return '/images/weather_icons/animated/cloudy.svg';
    case 'shower rain':
      return '/images/weather_icons/animated/rainy-6.svg';
    case 'rain':
      return '/images/weather_icons/animated/rainy-3.svg';
    case 'thunderstorm':
      return '/images/weather_icons/animated/thunder.svg';
    case 'snow':
      return '/images/weather_icons/animated/snowy-6.svg';
    case 'mist':
      return '/images/weather_icons/animated/cloudy.svg';
    default:
      return '/images/weather_icons/animated/cloudy.svg';
  }
}

function getWeather(object) {
  let location = {
    lat: object.coords.latitude.toFixed(4),
    long: object.coords.longitude.toFixed(4)
  };
  console.log(location);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${
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
          menu: item.restaurant.menu_url
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
              menu: item.restaurant.menu_url
            };
          });
          let filteredArray = nearbyArray.filter(val =>
            bestArray.includes(val)
          );
          let restoArray = bestArray.concat(filteredArray);
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

function getEvents(object) {
  let date = `${moment(new Date().toLocaleDateString('en-US')).format(
    'YYYY-MM-DD'
  )}T00:00:00Z`;
  console.log(date);
  let location = {
    lat: object.coords.latitude.toFixed(4),
    long: object.coords.longitude.toFixed(4)
  };
  fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?&latlong=${
      location.lat
    },${
      location.long
    }&radius=20&unit=miles&size=50&startDateTime=${date}&includeTBD=no&classificationName=${
      this.state.board2.category
    }&sort=date,asc&apikey=${keys.TMKEY}`
  )
    .then(r => r.json())
    .then(result => {
      console.log(result);
      let newArray = result._embedded.events.map(event => {
        if (event.classifications[0].subGenre) {
          return {
            name: event.name,
            img: event.images[8].url,
            url: event.url,
            date: event.dates.start.localDate,
            time: event.dates.start.localTime,
            distance: event.distance,
            type: event.classifications[0].segment.name,
            genre: event.classifications[0].subGenre.name,
            venue: event._embedded.venues[0]
          };
        } else {
          return {
            name: event.name,
            img: event.images[5].url,
            url: event.url,
            date: event.dates.start.localDate,
            time: event.dates.start.localTime,
            distance: event.distance,
            type: event.classifications[0].segment.name,
            venue: event._embedded.venues[0]
          };
        }
      });
      this.setState({
        board2: { ...this.state.board2, events: newArray }
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
      userPreferences: {
        bgTerm: '',
        newsTerm: '',
        array: []
      },
      bgQuery: '',
      newsQuery: '',
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
    fetch('/api/preferences')
      .then(r => r.json())
      .then(result => {
        let prefArray = result.map(item => {
          return { id: item.id, term: item.term, type: item.type };
        });
        this.setState(
          {
            userPreferences: {
              ...this.state.userPreferences,
              array: prefArray
            }
          },
          () => {
            let bg_query;
            let news_query;
            if (this.state.userPreferences.array.length === 0) {
              bg_query = 'space';
              news_query = `country=us`;
            } else {
              let bgArray = this.state.userPreferences.array
                .filter(item => {
                  return item.type === 'background';
                })
                .map(object => {
                  return object.term;
                });
              let newsArray = this.state.userPreferences.array
                .filter(item => {
                  return item.type === 'news_source';
                })
                .map(object => {
                  return object.term;
                });

              if (bgArray.length === 1 && newsArray.length === 0) {
                bg_query = bgArray[0];
                news_query = `country=us`;
              } else if (bgArray.length === 0 && newsArray.length === 1) {
                bg_query = 'space';
                news_query = `sources=${newsArray[0]}`;
              } else if (bgArray.length === 0 && newsArray.length > 1) {
                news_query = `sources=${newsArray.map(item => {
                  return `${item}`;
                })}`;
                bg_query = 'space';
              } else if (bgArray.length === 1 && newsArray.length === 1) {
                bg_query = bgArray[0];
                news_query = `sources=${newsArray[0]}`;
              } else if (bgArray.length === 1 && newsArray.length > 1) {
                bg_query = bgArray[0];
                news_query = `sources=${newsArray.map(item => {
                  return `${item}`;
                })}`;
              } else if (bgArray.length === 0 && newsArray.length > 1) {
                bg_query = 'space';
                news_query = `sources=${newsArray.map(item => {
                  return `${item}`;
                })}`;
              } else if (bgArray.length > 1 && newsArray.length === 0) {
                let ranNum = Math.floor(Math.random() * bgArray.length);
                bg_query = bgArray[ranNum];
                news_query = 'country=us';
              } else {
                let ranNum = Math.floor(Math.random() * bgArray.length);
                news_query = `sources=${newsArray.map(item => {
                  return `${item}`;
                })}`;
                bg_query = bgArray[ranNum];
              }
            }
            this.setState(
              {
                bgQuery: bg_query,
                newsQuery: news_query
              },
              () => {
                fetch(
                  `https://api.unsplash.com/search/photos?query=${
                    this.state.bgQuery
                  }&client_id=${keys.USKEY}`
                )
                  .then(r => r.json())
                  .then(object => {
                    console.log(object);
                    let ranNum = Math.floor(Math.random() * 9);
                    fetch(
                      `https://newsapi.org/v2/top-headlines?${
                        this.state.newsQuery
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
                          },
                          bgUrl: object.results[ranNum].urls.regular
                        });
                      });
                  });
              }
            );
          }
        );
      });
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(getWeather.bind(this));
      navigator.geolocation.getCurrentPosition(getRestInfo.bind(this));
      navigator.geolocation.getCurrentPosition(getEvents.bind(this));
    } else {
      let object = {
        coords: {
          latitude: 34,
          longitude: -84
        }
      };
      getWeather(object);
      getRestInfo(object);
      getEvents(object);
    }

    // home component with boards and tiles
    fetch('/api/events')
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

    fetch('/api/settings')
      .then(r => r.json())
      .then(object => {
        this.setState({
          userInfo: object
        });
      });
  }

  handleEventType(item) {
    let date = `${moment(new Date().toLocaleDateString('en-US')).format(
      'YYYY-MM-DD'
    )}T00:00:00Z`;
    this.setState(
      {
        board2: {
          ...this.state.board2,
          category: item
        }
      },
      () => {
        fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?&latlong=${
            this.state.coords.lat
          },${
            this.state.coords.long
          }&radius=20&unit=miles&size=50&startDateTime=${date}&includeTBD=no&classificationName=${
            this.state.board2.category
          }&sort=date,asc&apikey=${keys.TMKEY}`
        )
          .then(r => r.json())
          .then(result => {
            let newArray = result._embedded.events.map(event => {
              if (event._embedded.venues[0] && event.classifications[0].genre) {
                return {
                  name: event.name,
                  img: event.images[8].url,
                  url: event.url,
                  date: event.dates.start.localDate,
                  time: event.dates.start.localTime,
                  type: event.classifications[0].segment.name,
                  genre: event.classifications[0].genre.name,
                  venue: event._embedded.venues[0]
                };
              } else if (
                event._embedded.venues[0] &&
                !event.classifications[0].genre
              ) {
                return {
                  name: event.name,
                  img: event.images[8].url,
                  url: event.url,
                  date: event.dates.start.localDate,
                  time: event.dates.start.localTime,
                  type: event.classifications[0].segment.name,
                  venue: event._embedded.venues[0]
                };
              } else {
                return {
                  name: event.name,
                  img: event.images[0].url,
                  url: event.url,
                  date: event.dates.start.localDate,
                  time: event.dates.start.localTime,
                  type: event.classifications[0].segment.name
                };
              }
            });
            this.setState({
              board2: { ...this.state.board2, events: newArray }
            });
          });
      }
    );
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
    fetch('/api/events/new', {
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
    fetch(`/api/events/${this.state.board1.calendar.selectedEvent.id}/delete`, {
      method: 'POST'
    })
      .then(r => r.json())
      // .then(console.log);
      .then(res => {
        let newEvents = this.state.board1.calendar.events.filter(event => event.id !== res);
        this.setState({
          board1: {
            ...this.state.board1,
            calendar: {
              ...this.state.board1.calendar,
              events: newEvents,
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

  // SETTINGS COMPONENT
  handleNewName(event) {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        name: event.target.value
      }
    });
  }
  handleNewEmail(event) {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        email: event.target.value
      }
    });
  }

  handleInfoSubmit(event) {
    event.preventDefault();
    if (
      event.target.newPass.value.length >= 8 &&
      event.target.newPass.value === event.target.confirmNewPass.value
    ) {
      const infoObject = {
        name: event.target.name.value,
        email: event.target.email.value,
        password: event.target.curPass.value,
        newPass: event.target.newPass.value
      };
      fetch('/api/settings/info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(infoObject)
      })
        .then(r => r.json())
        .then(result => {
          this.setState({
            userInfo: result
          });
        });
    } else {
      const infoObject = {
        name: event.target.name.value,
        email: event.target.email.value,
        password: event.target.curPass.value
      };
      fetch('/api/settings/info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(infoObject)
      })
        .then(r => r.json())
        .then(result => {
          this.setState({
            userInfo: result
          });
        });
    }
  }

  handleBgTermChange(event) {
    this.setState({
      userPreferences: {
        ...this.state.userPreferences,
        bgTerm: event.target.value
      }
    });
  }

  handleNewsTermChange(event) {
    this.setState({
      userPreferences: {
        ...this.state.userPreferences,
        newsTerm: event.target.value
      }
    });
  }

  handleNewBackground(event) {
    event.preventDefault();
    if (this.state.userPreferences.bgTerm !== '') {
      let object = {
        id: 1,
        value: this.state.userPreferences.bgTerm,
        type: 'background'
      };
      fetch('/api/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
      })
        .then(r => r.json())
        .then(result => {
          this.setState({
            userPreferences: {
              ...this.state.userPreferences,
              array: [...this.state.userPreferences.array, result]
            }
          });
        });
    }
  }

  handleNewsSource(event) {
    event.preventDefault();
    console.log(event.select);
    if (this.state.userPreferences.newsTerm !== '') {
      let object = {
        id: 2,
        value: this.state.userPreferences.newsTerm,
        type: 'news_source'
      };
      fetch('/api/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
      })
        .then(r => r.json())
        .then(result => {
          this.setState({
            userPreferences: {
              ...this.state.userPreferences,
              array: [...this.state.userPreferences.array, result]
            }
          });
        });
    }
  }

  handlePrefDelete(item) {
    console.log(item);
    let index = this.state.userPreferences.array.indexOf(item);
    let array = this.state.userPreferences.array;
    console.log(index);
    array.splice(index, 1);

    fetch(`/api/preferences/${item.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(result => {
      console.log(result);
      this.setState({
        userPreferences: {
          ...this.state.userPreferences,
          array: this.state.userPreferences.array.filter(
            pref => pref.id !== item.id
          )
        }
      });
    });
  }

  addToCalendar(item) {
    console.log(item);
    const newEvent = {
      title: item.name,
      allDay: false,
      start: `${item.date} ${item.time}`,
      end: `${item.date} 23:59:00`,
      description: `Genre: ${item.genre}, Venue: ${item.venue.name}`
    };

    console.log(newEvent);
    fetch('/api/events/new', {
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

  render() {
    return (
      <>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <div className="home" style={createBackSplash(this.state.bgUrl)}>
            <ul className="navList">
              <li>
                <NavLink
                  activeStyle={{
                    borderBottom: '1px solid white',
                    paddingBottom: '3px'
                  }}
                  to="/home/dash1"
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
                  to="/home/dash2"
                >
                  Events & Places
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeStyle={{
                    borderBottom: '1px solid white',
                    paddingBottom: '3px'
                  }}
                  to="/home/dash3"
                >
                  Map
                </NavLink>
              </li>
            </ul>
            <Switch>
              <SwipeableRoutes>
                <Route
                  path="/home/settings/info"
                  render={props => {
                    return (
                      <Settings
                        userInfo={this.state.userInfo}
                        preferences={this.state.userPreferences.array}
                        bgTerm={this.state.userPreferences.bgTerm}
                        newsTerm={this.state.userPreferences.newsTerm}
                        handleBgTermChange={this.handleBgTermChange.bind(this)}
                        handleNewsTermChange={this.handleNewsTermChange.bind(
                          this
                        )}
                        handleNewBackground={this.handleNewBackground.bind(
                          this
                        )}
                        handleNewsSource={this.handleNewsSource.bind(this)}
                        handleNewName={this.handleNewName.bind(this)}
                        handleNewEmail={this.handleNewEmail.bind(this)}
                        handleInfoSubmit={this.handleInfoSubmit.bind(this)}
                        handlePrefDelete={this.handlePrefDelete.bind(this)}
                        {...props}
                      />
                    );
                  }}
                />
                <Route
                  path="/home/dash1"
                  render={props => {
                    return (
                      <Suspense fallback={<div>Loading...</div>}>
                        <Board_1
                          weather={this.state.board1.weather}
                          icon={this.state.board1.weatherIcon}
                          news={this.state.board1.news.articles}
                          events={this.state.board1.calendar.events}
                          allDay={this.state.board1.calendar.allDay}
                          selectedEvent={
                            this.state.board1.calendar.selectedEvent
                          }
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
                      </Suspense>
                    );
                  }}
                />
                <Route
                  path="/home/dash2"
                  render={props => {
                    return (
                      <Suspense fallback={<div>Loading...</div>}>
                        <Board_2
                          events={this.state.board2.events}
                          {...props}
                          addToCalendar={this.addToCalendar.bind(this)}
                          handleEventType={this.handleEventType.bind(this)}
                          restaurants={this.state.board2.restaurants}
                        />
                      </Suspense>
                    );
                  }}
                />
                <Route
                  path="/home/dash3"
                  render={props => {
                    return (
                      <Suspense fallback={<div>Loading...</div>}>
                        <Board_3
                          coords={this.state.coords}
                          markers={this.state.board2.restaurants}
                          events={this.state.board2.events}
                          {...props}
                        />
                      </Suspense>
                    );
                  }}
                />
              </SwipeableRoutes>
            </Switch>
          </div>
        </Suspense>
      </>
    );
  }
}

export default Home;
