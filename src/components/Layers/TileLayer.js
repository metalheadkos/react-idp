import { useEffect } from 'react'
import OLTileLayer from 'ol/layer/Tile'

export default function TileLayer({ source, map }) {
  useEffect(() => {
    if (!map) return

    const tileLayer = new OLTileLayer({ source })
    map.addLayer(tileLayer)

    // eslint-disable-next-line consistent-return
    return () => {
      if (map) {
        map.removeLayer(tileLayer)
      }
    }
  }, [map, source])

  return null
}
