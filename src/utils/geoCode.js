const request = require('request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW1hbmR1YSIsImEiOiJjazVhMGxiZmowdjdoM2RvZXR0cXNhaWxtIn0.OS2K23unvmDQ6JvGVBAT7A&limit=1'
  
    request({url, json: true}, (error, {body} = {}) => {
      if (error) {
          callback(' Unable to connect to location services!!', undefined)
      } else if (body?.features?.length === 0) {
          callback(' Unable to find location, try with other location', undefined)
      } else {
        const {center, place_name} = body.features[0];
          callback(undefined, {
              latitude: center[1],
              longitude: center[0],
              location: place_name
          })
      }
    })
  }

module.exports = geoCode;