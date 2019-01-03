import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import Weather from '../Tiles/Weather';
import Board_1 from '../Boards/Board_1';
import Board_2 from '../Boards/Board_2';
import Board_3 from '../Boards/Board_3';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: [],
      boards: []
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
  }
  render() {
    return (
      <Router>
        <div className='home'>
          <Link to='/home/1'>Daily Briefing</Link>
          <Link to='/home/2'>Entertainment</Link>
          <Link to='/home/3'>Transportation</Link>
          <Route path='/home/1' exact component={Board_1} />
          <Route path='/home/2' exact component={Board_2} />
          <Route path='/home/3' exact component={Board_3} />
        </div>
      </Router>
    );
  }
}

export default Home;
