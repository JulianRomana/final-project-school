import React, { FC } from 'react'
import map from '../assets/map.svg'
import { MapContainer, TileLayer } from 'react-leaflet'

const MapPage: FC = () => {
  return (
    <MapContainer
      center={[0, 0]}
      zoom={1}
      scrollWheelZoom={false}
      className='h-screen'
    >
      <TileLayer url={map} tileSize={600} />
    </MapContainer>
  )
}

export default MapPage
