import { Icon, Style } from 'ol/style'
import OLVectorLayer from 'ol/layer/Vector'
import { useEffect, useState } from 'react'
import { fromLonLat, transform } from 'ol/proj'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import Helpers from '../../services/Helpers'

export default function VectorLayer({ source, map, handler, limit }) {
  const [markers, setMarkers] = useState(undefined)
  useEffect(() => {
    if (!map) return

    const layer = new OLVectorLayer({
      source,
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          scale: [0.5, 0.5],
          src: 'logo-70x70.png',
        }),
      }),
    })

    map.addLayer(layer)
    setMarkers(layer)

    // eslint-disable-next-line consistent-return
    return () => {
      if (map) {
        map.removeLayer(layer)
      }
    }
  }, [map, source])

  useEffect(() => {
    const handleClick = (event) => {
      event.preventDefault()
      const coords = transform(event.coordinate, 'EPSG:3857', 'EPSG:4326')

      if (Helpers.isDefined(markers) && markers.getSource().getFeatures().length < limit) {
        const marker = new Feature(new Point(fromLonLat([coords[0], coords[1]])))
        markers.getSource().addFeature(marker)
        handler(Helpers.extractCoordinates(markers.getSource().getFeatures()))
      }
    }
    if (!map) return
    map.on('singleclick', handleClick)
  }, [markers, limit, map, handler])

  return null
}
