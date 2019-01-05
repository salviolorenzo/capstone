import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import keys from '../../config';
function createStyles() {
  const mapStyles = {
    width: '90%',
    height: '70%'
  };
  return mapStyles;
}
class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={createStyles()}
        initialCenter={{
          lat: 34,
          lng: -84
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: keys.GOKEY
})(MapContainer);
