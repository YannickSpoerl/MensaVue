<template>
  <div>
    <v-app-bar
      dark
      color="primary">
    <v-spacer></v-spacer>
    <v-toolbar-title
      class="font-weight-light display-2">
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
    ></v-autocomplete>
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
      @change="maxFourSelects"
      label="Canteen">
      <template v-slot:selection="{ item, index }">
        <span v-if="index === 0">
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
      <v-col cols="2">
        Filter
      </v-col>
      <v-col cols="10">
        <CanteensComponent
          v-if="selectedCanteens.length > 0"
          :canteens="selectedCanteens"
          @close="removeCanteen"/>
      </v-col>
    </v-row>
    <FooterComponent style="margin-bottom: 0px"></FooterComponent>
  </div>
</template>

<script>
import FooterComponent from './FooterComponent'
import CanteensComponent from './CanteensComponent'
export default {
  name: 'Home',
  components: { FooterComponent,
    CanteensComponent },
  data () {
    return {
      selectedCity: undefined,
      selectedCanteens: []
    }
  },
  beforeMount () {

  },
  methods: {
    maxFourSelects (value) {
      if (value.length > 4) {
        value.pop(value.length - 1)
      }
    },
    removeCanteen (index) {
      this.selectedCanteens.splice(index, 1)
    }
  }
}
</script>

<style>
</style>
