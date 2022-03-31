export default function useGeolocation() {
  return new Promise((resolve, reject) => {
    const success = (pos) => {
      const crd = pos.coords

      resolve(crd)
    }

    // eslint-disable-next-line no-shadow
    const error = (error) => {
      reject(error)
    }

    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    }

    navigator.geolocation.getCurrentPosition(success, error, options)
  }).then((value) => Promise.resolve(value))
    .catch((e) => Promise.reject(e))
}
