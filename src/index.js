import React, { Component } from 'react'

import LeafletEditableCircle from './leaflet-editable-circle';

export default class ReactLeafletEditableCircle extends Component {

  render() {
		return (
			<LeafletEditableCircle 
				center={this.props.center} 
				radius={this.props.radius}
				onPositionChange={(latlng) => {this.props.onPositionChange(latlng) }}
			/>
		)	
	}
}
