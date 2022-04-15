import React, { useEffect, useRef, useState } from 'react'
import { View } from 'ol'
import PropTypes from 'prop-types'
import Map from 'ol/Map'
import { OSM, Vector } from 'ol/source'
import Layers from './Layers/Layers'
import TileLayer from './Layers/TileLayer'
import VectorLayer from './Layers/VectorLayer'

// eslint-disable-next-line no-unused-vars
export default function AppMap({ zoom, center, handler, limit }) {
  const mapRef = useRef()
  const [map, setMap] = useState(null)

  useEffect(() => {
    const mapOptions = {
      view: new View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: [],
    }

    const mapObject = new Map(mapOptions)
    mapObject.setTarget(mapRef.current)
    setMap(mapObject)

    return () => mapObject.setTarget(undefined)
  }, [center, zoom])

  useEffect(() => {
    if (!map) return
    map.getView().setZoom(zoom)
  }, [map, zoom])
  // center change handler
  useEffect(() => {
    if (!map) return
    map.getView().setCenter(center)
  }, [center, map])
  return (
    <div ref={mapRef}>
      <Layers>
        <TileLayer source={new OSM()} map={map} />
        <VectorLayer source={new Vector()} map={map} handler={handler} limit={limit} />
      </Layers>
    </div>
  )
}

AppMap.propTypes = {
  zoom: PropTypes.number,
  limit: PropTypes.number,
  center: PropTypes.instanceOf(Array),
  handler: PropTypes.func,
}

AppMap.defaultProps = {
  zoom: 9,
  limit: 5,
  center: [83, 54],
  handler: () => {},
}
