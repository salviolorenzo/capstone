import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import Weather from '../Tiles/Weather';
import Board_1 from '../Boards/Board_1';
import Board_2 from '../Boards/Board_2';
import Board_3 from '../Boards/Board_3';
const city = 'Atlanta';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: [],
      board1: {
        tiles: [],
        weather: {},
        news: {}
      },
      board2: {},
      board3: {}
    };
  }

  componentDidMount() {
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
    fetch('/home/1')
      .then(r => r.json())
      .then(array => {
        this.setState({
          board1: { ...this.state.board1, tiles: array }
        });
      });
    fetch('/home/1/weather')
      .then(r => r.json())
      .then(result => {
        this.setState({
          board1: { ...this.state.board1, weather: result }
        });
      });
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
          <Route path='/home/2' exact component={Board_2} />
          <Route path='/home/3' exact component={Board_3} />
        </div>
      </Router>
    );
  }
}

export default Home;
