import { MapLayer, withLeaflet } from 'react-leaflet';

import L from 'leaflet';


class LeafletEditableCircle extends MapLayer {

	_attachListener(circle) {
		var map = this.props.leaflet.map;

		// Make the circle stand out a little when we mouse over to indicate it's interactable
		circle.on({
			mouseover: function() {
				circle.setStyle({
					fillOpacity: 0.35,
					weight: 4
				})
			},
			mouseout: function() {
				circle.setStyle({
					fillOpacity: 0.2,
					weight: 3
				})
			}
		})

		// When we mouse down on the circle, stop the map from moving and
		// use the maps 'mousemove' to move the circles position
		circle.on({
			mousedown: function () {
				map.dragging.disable();
				map.on('mousemove', (e) => {
					circle.setLatLng(e.latlng);
				});
			}
		 }); 

		 // When we mouse up on the circle, stop the mouse move listener,
		 // re-enable map dragging and fire the onPosition handler
		 map.on('mouseup', (e) => {
			this.props.onPositionChange(e.latlng);
			map.dragging.enable();
		  	map.removeEventListener('mousemove');
		 });
	}

	createLeafletElement(props) {
		var map = this.props.leaflet.map
		var circle = L.circle(this.props.center, this.props.radius, ...this.props);
		this._attachListener(circle);
		return circle;
	}

	updateLeafletElement(fromProps, toProps) {
		var map = toProps.leaflet.map;
		map.removeLayer(this.leafletElement);
		var circle = L.circle(this.circle._latlng, toProps.radius);
		circle.addTo(map);
		this._attachListener(circle);
	}
}

export default withLeaflet(LeafletEditableCircle);