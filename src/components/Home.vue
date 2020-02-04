<template>
 <v-app-bar dark  color="primary">

      <v-spacer></v-spacer>

      <v-toolbar-title>MensaVue</v-toolbar-title>

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
        prepend-icon="mdi-city"
      ></v-autocomplete>

      <v-spacer></v-spacer>

      <v-select
        style="margin-top: 2%;"
        item-text="name"
        item-value="id"
        :items="$globalData.canteens.get(selectedCity)"
        v-model="selectedCanteen"
        prepend-icon="mdi-restaurant"
        no-data-text="Select a city first"
        placeholder="Choose your canteen"
        label="Canteen"
      ></v-select>

      <v-spacer></v-spacer>

    </v-app-bar>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      selectedCity: undefined,
      selectedCanteen: undefined
    }
  }
}
</script>

<style>
</style>
