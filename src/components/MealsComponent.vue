<template>
  <v-row>
    <v-col cols=2>
      <v-card>
        <v-list
          style="max-height: 600px"
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
    <v-col cols=6>
      <v-card>
        <v-list
          style="max-height: 600px"
          class="overflow-y-auto"
          dense>
          <div
            v-for="category in selectedMeals"
            :key="category.category"
            >
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
    <v-col cols=4>
      <MealComponent
        v-if="selectedMeal"
        :meal="selectedMeal"
        :icon="getIcon(selectedMeal.category)"/>
    </v-col>
  </v-row>
</template>

<script>
import {getCategorizedMeals} from '../services/FilterService'
import MealComponent from './MealComponent'

export default {
  name: 'MealsComponent',
  props: ['meals'],
  components: {
    MealComponent
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
  computed: {
    categories () {
      return getCategorizedMeals(this.meals)
    },
    selectedMeals () {
      let self = this
      let categories = []
      this.categories.forEach((category) => {
        if (self.selectedCategories[category.category] === 0) {
          categories.push(category)
        }
      })
      if (categories.length < 1) {
        this.$store.commit('selectMeals', this.categories)
        return this.categories
      }
      this.$store.commit('selectMeals', categories)
      return categories
    }
  }
}
</script>

<style>

</style>
