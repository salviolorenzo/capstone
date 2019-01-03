import React, { Component } from 'react';

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: {}
    };
  }

  componentWillReceiveProps() {
    this.setState({
      weather: this.props.weather
    });
  }

  render() {
    return (
      <div className='tile weatherTile'>
        <h3>Weather</h3>
        {Object.values(this.state.weather).map(item => {
          return <p>{item}</p>;
        })}
      </div>
    );
  }
}

export default Weather;
