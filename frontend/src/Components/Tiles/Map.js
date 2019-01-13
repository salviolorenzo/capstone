import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import keys from '../../config';
import yourLocImg from '../../images/yourLocation.png';
import restoIcon from '../../images/restoIcon.png';
import eventIcon from '../../images/eventIcon.png';
function createStyles() {
  const mapStyles = {
    width: '90%',
    height: '50%'
  };
  return mapStyles;
}

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  foodOrShow(criteria) {
    if (criteria === undefined) {
      return (
        <>
          <h4>{this.state.selectedPlace.categories}</h4>
          <h4>{this.state.selectedPlace.distance}</h4>
        </>
      );
    } else {
      return (
        <>
          <h6>{this.state.selectedPlace.categories}</h6>
          <h5>{`Avg. Rating: ${this.state.selectedPlace.rating}/5`}</h5>
          <h5>{`Pricing: ${this.state.selectedPlace.pricing}/4`}</h5>
        </>
      );
    }
  }

  render() {
    return (
      <>
        <ul className="mapLegend">
          <li>
            <button id="restoLegend" />
            Restaurants
          </li>
          <li>
            <button id="eventLegend" />
            Events
          </li>
        </ul>
        <Map
          google={this.props.google}
          zoom={14}
          style={createStyles()}
          initialCenter={{
            lat: parseFloat(this.props.coords.lat),
            lng: parseFloat(this.props.coords.long)
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
                url={item.menu}
                position={{
                  lat: parseFloat(item.location.latitude),
                  lng: parseFloat(item.location.longitude)
                }}
                onClick={this.onMarkerClick.bind(this)}
                icon={{
                  url: restoIcon
                }}
              />
            );
          })}
          {this.props.events.map((item, index) => {
            return (
              <Marker
                key={index}
                name={item.name}
                categories={item.date}
                distance={`${item.distance} miles`}
                url={item.url}
                position={{
                  lat: parseFloat(item.venue.location.latitude),
                  lng: parseFloat(item.venue.location.longitude)
                }}
                onClick={this.onMarkerClick.bind(this)}
                icon={{
                  url: eventIcon
                }}
              />
            );
          })}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose.bind(this)}
          >
            <div className="infoWindow">
              <a href={this.state.selectedPlace.url}>
                <h4>{this.state.selectedPlace.name}</h4>
              </a>
              {this.foodOrShow(this.state.selectedPlace.rating)}
            </div>
          </InfoWindow>
        </Map>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: keys.GOKEY
})(MapContainer);
