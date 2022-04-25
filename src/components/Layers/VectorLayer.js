import { Icon, Style } from 'ol/style'
import OLVectorLayer from 'ol/layer/Vector'
import { useEffect, useState } from 'react'
import { fromLonLat, transform } from 'ol/proj'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import { unByKey } from 'ol/Observable'
import Helpers from '../../services/Helpers'

export default function VectorLayer({ source, map, handler, limit, points }) {
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

    const handleClick = (event) => {
      // eslint-disable-next-line no-debugger
      // debugger
      event.preventDefault()
      const coords = transform(event.coordinate, 'EPSG:3857', 'EPSG:4326')

      if (layer.getSource().getFeatures().length < limit) {
        const marker = new Feature(new Point(fromLonLat([coords[0], coords[1]])))
        layer.getSource().addFeature(marker)
        handler(Helpers.extractCoordinates(layer.getSource().getFeatures()))
      }
    }
    const evtKey = map.on('singleclick', handleClick)

    // eslint-disable-next-line consistent-return
    return () => {
      if (map) {
        map.removeLayer(layer)
        unByKey(evtKey)
      }
    }
  }, [handler, limit, map, source])

  useEffect(() => {
    if (map && Helpers.isDefined(markers) && Helpers.isDefined(points) && points.length > 0) {
      points.forEach((p) => {
        const marker = new Feature(new Point(p))
        markers.getSource().addFeature(marker)
      })

      handler(Helpers.extractCoordinates(markers.getSource().getFeatures()))
    }
  }, [points, markers, map, handler])

  return null
}
