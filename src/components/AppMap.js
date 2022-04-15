import React, { useEffect, useRef, useState } from 'react'
import { View } from 'ol'
import PropTypes from 'prop-types'
import Map from 'ol/Map'
import { Tile, Vector as VectorLayer } from 'ol/layer'
import { OSM, Vector } from 'ol/source'
import { Icon, Style } from 'ol/style'
import { transform } from 'ol/proj'

// eslint-disable-next-line no-unused-vars
const MAX_MARKERS_QTY = 5

export default function AppMap({ zoom, center, handler }) {
  const mapRef = useRef()
  const [map, setMap] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [pointArr, setPointArr] = useState([])

  useEffect(() => {
    if (!map) return
    map.on('singleclick', (event) => {
      console.log(transform(event.coordinate, 'EPSG:3857', 'EPSG:4326'))
      if (pointArr.length < MAX_MARKERS_QTY) {
        // smth
      }
    })
  }, [handler, map, pointArr])
  useEffect(() => {
    const mapOptions = {
      view: new View({ zoom, center }),
      layers: [
        new Tile({ source: new OSM() }),
        new VectorLayer({
          source: new Vector(),
          style: new Style({
            image: new Icon({
              anchor: [0.5, 1],
              src: 'logo-70x70.png',
            }),
          }),
        }),
      ],
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
    <div ref={mapRef} />
  )
}

AppMap.propTypes = {
  zoom: PropTypes.number,
  center: PropTypes.instanceOf(Array),
  handler: PropTypes.func,
}

AppMap.defaultProps = {
  zoom: 9,
  center: [83, 54],
  handler: () => {},
}
