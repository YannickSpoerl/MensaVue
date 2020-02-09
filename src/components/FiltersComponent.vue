<template>
  <v-card
    dark
    style="margin: 5px; margin-left: 15px"
    height="835px"
    color="primary">
    <v-list
      v-if="$store.state.selectedCanteens.length > 0"
      color="primary"
      two-line
      flat>
      <v-subheader>Filters</v-subheader>
      <v-list-item-group
        v-model="selectedFilters"
        multiple>
        <v-list-item
          v-for="filter in availableFilters"
          :key="filter">
          <template
            v-slot:default="{ active, toggle }">
            <v-list-item-action>
              <v-checkbox
                v-model="active"
                @click="toggle"/>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{filter}}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
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
