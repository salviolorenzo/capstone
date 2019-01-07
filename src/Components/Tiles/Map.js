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
        zoom={12}
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
              categories={item.category}
              rating={item.avg_rating}
              pricing={item.price}
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
          <div className='infoWindow'>
            <h4>{this.state.selectedPlace.name}</h4>
            <h6>{this.state.selectedPlace.categories}</h6>
            <h5>{`Avg. Rating: ${this.state.selectedPlace.rating}/5`}</h5>
            <h5>{`Pricing: ${this.state.selectedPlace.pricing}/4`}</h5>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: keys.GOKEY
})(MapContainer);
