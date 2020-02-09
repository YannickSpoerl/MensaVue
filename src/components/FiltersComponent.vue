<template>
    <v-card
    dark
    style="margin: 5px; margin-left: 15px"
    height="835px"
    color="primary">
    <ul
      v-if="$store.state.selectedCanteens.length > 0"
      style="list-style: none;">
      <li v-for="filter in availableFilters" :key="filter">
        {{filter}}
      </li>
    </ul>
  </v-card>
</template>

<script>
export default {
  name: 'FiltersComponent',
  data () {
    return {
      selectedFilters: []
    }
  },
  computed: {
    availableFilters () {
      return this.$store.getters.availableFilters
    }
  }
}
</script>

<style>
</style>
