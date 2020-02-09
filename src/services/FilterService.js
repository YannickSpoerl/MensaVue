function getCanteensMap (array) {
  const cities = new Map()
  array.forEach((canteen) => {
    if (!cities.get(canteen.city)) {
      cities.set(canteen.city, [])
    }
    cities.get(canteen.city).push(canteen)
  })
  cities.forEach((value, index) => {
    value.sort(function (el1, el2) {
      if (el1.name < el2.name) {
        return -1
      } else {
        return 1
      }
    })
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
  meals.sort(function (el1, el2) {
    let date1 = new Date(el1.date)
    let date2 = new Date(el2.date)
    if (date1 < date2) {
      return -1
    } else {
      return 1
    }
  })
  return meals
}

function getCategorizedMeals (meals) {
  let categories = new Map()
  meals.forEach((meal) => {
    if (!categories.get(meal.category)) {
      categories.set(meal.category, [])
    }
    categories.get(meal.category).push(meal)
  })
  let categoryArray = Array.from(categories)
  return categoryArray.map((element) => {
    return {
      category: element[0],
      meals: element[1]
    }
  })
}

export {getCanteensMap, getMealsArray, getCategorizedMeals}
