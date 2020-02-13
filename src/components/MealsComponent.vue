<template>
  <v-row>
    <v-col cols=2>
      <v-card>
        <v-list
          style="max-height: 580px"
          class="overflow-y-auto">
          <v-subheader>Categories</v-subheader>
          <v-list-item-group
            color="primary"
            v-for="category in categories"
            :key="category.category"
            v-model="selectedCategories[category.category]">
            <v-list-item>
              <v-list-item-icon>
                <v-icon
                  v-text="getIcon(category.category)"/>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  v-text="category.category"/>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>
    <v-col
      cols=6
      v-if="filteredMeals.length > 0">
      <v-card>
        <v-list
          v-if="filteredMeals.length > 0"
          style="max-height: 580px"
          class="overflow-y-auto">
          <div
            v-for="category in filteredMeals"
            :key="category.category">
            <v-subheader>{{category.category}}</v-subheader>
            <v-list-item-group
              v-model="selectedMeal"
              color="primary">
              <v-list-item
                :value="meal"
                v-for="meal in category.meals"
                :key="meal.id">
                <v-list-item-icon>
                  <v-icon
                  color="primary">
                  {{getIcon(category.category)}}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    v-text="meal.name"/>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </div>
        </v-list>
      </v-card>
    </v-col>
    <v-col
      cols=4
      v-if="filteredMeals.length > 0">
      <MealComponent
        v-if="selectedMeal"
        :meal="selectedMeal"
        :icon="getIcon(selectedMeal.category)"/>
        <MealComponent
        v-if="!selectedMeal"
        :meal="filteredMeals[0].meals[0]"
        :icon="getIcon(filteredMeals[0].meals[0].category)"/>
    </v-col>
    <v-col
      cols=10
      v-if="filteredMeals.length < 1">
      <PlaceholderComponent
        message="No meals match selected filters"
        icon="mdi-emoticon-sad-outline"/>
    </v-col>
  </v-row>
</template>

<script>
import {getCategorizedMeals} from '../services/FilterService'
import MealComponent from './MealComponent'
import PlaceholderComponent from './PlaceholderComponent'

export default {
  name: 'MealsComponent',
  props: ['meals'],
  components: {
    MealComponent,
    PlaceholderComponent
  },
  beforeMount () {
    this.selectedCategories = {}
  },
  data () {
    return {
      selectedMeal: undefined,
      selectedCategories: undefined,
      icons: {
        pasta: 'mdi-pasta',
        food: 'mdi-silverware-fork-knife',
        evening: 'fas fa-moon',
        oven: 'mdi-toaster-oven',
        grill: 'mdi-grill'
      }
    }
  },
  methods: {
    getIcon (category) {
      switch (category) {
        case 'Pasta': return this.icons.pasta
        case 'Abendangebot': return this.icons.evening
        case 'GRILL': return this.icons.grill
        case 'Ofenfrisch': return this.icons.oven
        default: return this.icons.food
      }
    }
  },
  watch: {
    selectedMeals () {
      this.$store.commit('selectMeals', this.selectedMeals)
    }
  },
  computed: {
    categories () {
      return getCategorizedMeals(this.meals)
    },
    selectedFilters () {
      return this.$store.getters.selectedFilters
    },
    selectedMeals () {
      if (!this.selectedCategories) {
        return []
      }
      let self = this
      let categories = []
      this.categories.forEach((category) => {
        if (self.selectedCategories[category.category] === 0) {
          categories.push(category)
        }
      })
      if (categories.length < 1) {
        return this.categories
      }
      return categories
    },
    filteredMeals () {
      let self = this
      let categories = []
      this.selectedMeals.forEach((category) => {
        let c = {
          category: category.category,
          meals: []
        }
        category.meals.forEach((meal) => {
          let mealIsValid = true
          self.selectedFilters.forEach((filter) => {
            if (!meal.notes.includes(filter)) {
              mealIsValid = false
            }
          })
          if (mealIsValid) {
            c.meals.push(meal)
          }
        })
        if (c.meals.length > 0) {
          categories.push(c)
        }
      })
      return categories
    }
  }
}
</script>

<style>

</style>
