<template>
  <v-card
    dark
    style="margin: 5px; margin-left: 15px; max-height: 835px; overflow: hidden"
    height="835px"
    class="overflow-y-auto"
    color="primary">
    <v-subheader>Filters</v-subheader>
    <v-row
    v-if="availableFilters.length < 1 || $store.state.selectedCanteens.length < 1"
    justify="center">
      <span>
        {{emptyMessage}}
      </span>
    </v-row>
    <v-list
      v-if="$store.state.selectedCanteens.length > 0"
      color="primary"
      two-line
      flat>
      <v-row justify="center">
      <v-btn
        @click="selectedFilters = []"
        outlined
        color="white">
        Reset all filters
      </v-btn>
    </v-row>
      <v-list-item-group
        v-model="selectedFilters"
        multiple>
        <v-list-item
          v-for="filter in availableFilters"
          :value="filter"
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
    },
    emptyMessage () {
      if (!this.$store.state.selectedCity) {
        return 'No city, no filters'
      } else if (this.$store.state.selectedCanteens.length < 1) {
        return 'No canteen, no filters'
      } else {
        return 'No filters for selected meals available'
      }
    }
  },
  watch: {
    selectedFilters () {
      this.$store.commit('changeFilters', this.selectedFilters)
    }
  }
}
</script>

<style>
</style>
