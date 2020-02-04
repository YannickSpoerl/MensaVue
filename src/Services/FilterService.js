function getCanteensMap (array) {
  const cities = new Map()
  array.forEach((canteen) => {
    if (!cities.get(canteen.city)) {
      cities.set(canteen.city, [])
    }
    cities.get(canteen.city).push(canteen)
  })
  return cities
}

export {getCanteensMap}
