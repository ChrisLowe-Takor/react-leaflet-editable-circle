import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'

import ReactLeafletEditableCircle from 'react-leaflet-editable-circle'

export default class App extends Component {

	handleOnPositionChange(latLng) {
		console.log(latLng);
	}

  render () {
    return (
		<div className="map">
		  <Map
		    center={[44.635, 22.653]}
		    zoom={12}
		  >
			<TileLayer
			  attribution=""
			  url="https://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"/>
  
  			<ReactLeafletEditableCircle 
		  		center={[44.63, 22.65]}
			  	radius={600}
			  	onPositionChange={ (position) => this.handleOnPositionChange(position)}
		  />

		  </Map>
		</div>
	  )
  }
}
