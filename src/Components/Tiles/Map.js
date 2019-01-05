import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import keys from '../../config';
import yourLocImg from '../../images/yourLocation.png';
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
    this.state = {
      location: {
        lat: props.coords.lat,
        lng: props.coords.long
      },
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onClose(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={createStyles()}
        initialCenter={{
          lat: parseFloat(this.state.location.lat),
          lng: parseFloat(this.state.location.lng)
        }}
      >
        <Marker
          onClick={this.onMarkerClick.bind(this)}
          name={'Current location'}
          icon={{
            url: yourLocImg
          }}
        />
        {this.props.restaurants.map((item, index) => {
          return (
            <Marker
              key={index}
              name={item.name}
              position={{
                lat: parseFloat(item.location.latitude),
                lng: parseFloat(item.location.longitude)
              }}
              onClick={this.onMarkerClick.bind(this)}
            />
          );
        })}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose.bind(this)}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: keys.GOKEY
})(MapContainer);
