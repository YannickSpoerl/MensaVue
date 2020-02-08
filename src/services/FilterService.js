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

function getMealsArray (mealArray) {
  const mealMap = new Map()
  mealArray.forEach((canteen) => {
    canteen.forEach((date) => {
      if (date.meals.length > 0) {
        let dayMeals = mealMap.get(date.date)
        if (!dayMeals) {
          mealMap.set(date.date, [])
        }
        mealMap.set(date.date, mealMap.get(date.date).concat(date.meals))
      }
    })
  })
  const meals = []
  mealMap.forEach((value, key) => {
    meals.push({
      date: key,
      meals: value
    })
  })
  return meals
}

export {getCanteensMap, getMealsArray}
