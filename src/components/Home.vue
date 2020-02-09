<template>
  <div>
    <v-app-bar
      dark
      color="primary">
    <v-spacer></v-spacer>
    <v-toolbar-title
      class="font-weight-light display-1">
      MensaVue</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-autocomplete
      style="margin-top: 2%;"
      v-model="selectedCity"
      :items="$globalData.cities"
      color="white"
      clearable
      hide-no-data
      item-text="Description"
      item-value="API"
      label="City"
      placeholder="Enter your city"
      prepend-icon="mdi-home-city"
      @change="onCityChange">
    </v-autocomplete>
    <v-spacer></v-spacer>
    <v-select
      style="margin-top: 2%;"
      return-object
      item-text="name"
      :items="$globalData.canteens.get(selectedCity)"
      v-model="selectedCanteens"
      multiple
      prepend-icon="mdi-silverware-fork-knife"
      no-data-text="Select a city first"
      placeholder="Choose your canteen"
      @change="onCanteenChange"
      label="Canteen">
      <template
        v-slot:selection="{ item, index }">
        <span
          v-if="index === 0">
          {{item.name}}
        </span>
        <span v-if="index === 1">
          &nbsp;+&nbsp;{{item.name}}
        </span>
        <span
          v-if="index === 2">
          &nbsp;(+{{ selectedCanteens.length - 2 }} more)</span>
      </template>
    </v-select>
    <v-spacer></v-spacer>
    </v-app-bar>
    <v-row>
      <v-col
        cols="2"
        style="padding:0">
        <FiltersComponent/>
      </v-col>
      <v-col
        cols="10"
        style="padding-left:0">
        <CanteensComponent
          v-if="selectedCanteens.length > 0"
          @close="removeCanteen"/>
        <PlaceholderComponent
          icon="mdi-emoticon-happy-outline"
          v-if="selectedCanteens.length < 1 || !selectedCity"
          :message="emptySpaceMessage"/>
        <DatesComponent/>
      </v-col>
    </v-row>
    <FooterComponent style="margin-bottom: 0px"/>
  </div>
</template>

<script>
import FooterComponent from './FooterComponent'
import CanteensComponent from './CanteensComponent'
import DatesComponent from './DatesComponent'
import FiltersComponent from './FiltersComponent'
import PlaceholderComponent from './PlaceholderComponent'

export default {
  name: 'Home',
  components: {
    PlaceholderComponent,
    FooterComponent,
    CanteensComponent,
    DatesComponent,
    FiltersComponent },
  data () {
    return {
      selectedCity: undefined,
      selectedCanteens: [],
      allMeals: []
    }
  },
  methods: {
    onCanteenChange (canteens) {
      if (canteens.length > 3) {
        canteens.pop(canteens.length - 1)
      }
      this.$store.commit('selectCanteen', canteens)
    },
    removeCanteen (index) {
      this.$store.commit('unselectCanteen', index)
    },
    onCityChange (city) {
      this.$store.commit('selectCity', city)
      let self = this
      if (this.selectedCity) {
        this.$globalData.canteens.get(this.selectedCity).forEach((canteen) => {
          self.$globalData.restService.getTodayOpen(canteen.id)
            .then((open) => {
              canteen.open = open
            })
        })
      }
    }
  },
  computed: {
    emptySpaceMessage () {
      if (!this.selectedCity) {
        return 'Please select a city'
      } else if (this.selectedCanteens.length < 1) {
        return 'Please select one or more canteens'
      }
    }
  }
}
</script>

<style>
</style>
