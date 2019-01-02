import React, { Component } from 'react';
const city = 'Atlanta';

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: ''
    };
  }

  componentDidMount() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&apikey=88b430eb57686cffb62a9a7565a182f5`
    )
      .then(r => r.json())
      .then(result => {
        this.setState({
          weather: {
            temp: `Temperature: ${(
              ((result.main.temp - 273.15) * 9) / 5 +
              32
            ).toFixed(2)} °F`,
            high: `High: ${(
              ((result.main.temp_max - 273.15) * 9) / 5 +
              32
            ).toFixed(2)} °F`,
            low: `Low: ${(
              ((result.main.temp_min - 273.15) * 9) / 5 +
              32
            ).toFixed(2)} °F`,
            hum: `Humidity: ${result.main.humidity} %`
          }
        });
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
