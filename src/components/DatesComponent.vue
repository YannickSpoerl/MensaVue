<template>
  <v-main>
    <PlaceHolderComponent
      v-if="meals.length < 1 && $store.state.selectedCanteens.length > 0"
      message="No meals available for this canteens"
      icon="mdi-emoticon-sad-outline"/>
    <v-tabs
      v-if="meals.length > 0"
      fixed-tabs
      background-color="primary"
              v-model="selectedDate"

      dark>
      <v-tab
        v-for="day in meals"
        :key="day.date">
        <v-icon>mdi-calendar</v-icon>
        &nbsp;{{formatDate(day.date)}}
      </v-tab>
    </v-tabs>
    <MealsComponent
      v-if="selectedDate != undefined && meals[selectedDate]"
      :meals="meals[selectedDate].meals"/>
  </v-main>
</template>

<script>
import {getMealsArray} from '../services/FilterService'
import MealsComponent from './MealsComponent'
import PlaceHolderComponent from './PlaceholderComponent'

export default {
  name: 'DatesComponent',
  components: {
    MealsComponent,
    PlaceHolderComponent
  },
  data () {
    return {
      selectedDate: undefined,
      meals: []
    }
  },
  methods: {
    formatDate (date) {
      return date.substring(8, 10) + '.' + date.substring(5, 7) + '.' + date.substring(0, 4)
    },
    async getMealsByCanteen (canteen) {
      const meals = await this.$globalData.restService.getMealsByCanteenId(canteen.id)
      meals.forEach((date) => {
        date.meals.filter((meal) => {
          meal.canteen = canteen.name
        })
      })
      this.$globalData.meals.set(canteen.id, meals)
      return meals
    }
  },
  computed: {
    selectedCanteens () {
      return this.$store.getters.selectedCanteens
    }
  },
  watch: {
    async selectedCanteens () {
      let selectedMeals = []
      for (let i = 0; i < this.selectedCanteens.length; i++) {
        if (!this.$globalData.meals.get(this.selectedCanteens[i].id)) {
          let meals = await this.getMealsByCanteen(this.selectedCanteens[i])
          selectedMeals.push(meals)
        } else {
          selectedMeals.push(this.$globalData.meals.get(this.selectedCanteens[i].id))
        }
      }
      this.meals = getMealsArray(selectedMeals)
      this.$store.commit('selectMeals', [])
    }
  }
}
</script>

<style>
</style>
