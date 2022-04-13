import { useEffect, useState } from 'react'

export default function useGeolocation() {
  const [location, setLocation] = useState({})

  useEffect(() => {
    const success = (pos) => {
      setLocation(pos.coords)
    }

    // eslint-disable-next-line no-shadow
    const error = (error) => {
      setLocation(error)
    }

    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    }

    navigator.geolocation.getCurrentPosition(success, error, options)
  }, [])

  return { location }
}
