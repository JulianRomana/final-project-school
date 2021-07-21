import React, { FC } from 'react'
import {
  MapContainer,
  ImageOverlay,
  Marker,
  Popup,
  MapContainerProps,
} from 'react-leaflet'
import { LatLngBoundsExpression, CRS } from 'leaflet'
import map from '../assets/map.png'
import 'leaflet/dist/leaflet.css'

const bounds: LatLngBoundsExpression = [
  [0, 0],
  [1000, 1000],
]

const mapConfig: MapContainerProps = {
  className: 'h-full',
  center: [700, 500],
  zoom: 1,
  crs: CRS.Simple,
  maxZoom: 3,
  scrollWheelZoom: false,
  maxBounds: bounds,
}

const MapPage: FC = () => {
  return (
    <div className='w-full h-screen'>
      <MapContainer {...mapConfig}>
        <ImageOverlay
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={map}
          bounds={bounds}
        />
        <Marker position={[1000, 2000]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default MapPage
