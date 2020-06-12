<template>
  <v-container
    style="margin: 15%">
    <span
      style="color: teal"
      :class="textClass">
      {{message}}
    </span>
    <v-icon
      color="primary"
      :size="size">
      {{icon}}
    </v-icon>
  </v-container>
</template>

<script>
export default {
  name: 'PlaceholderComponent',
  props: ['icon', 'message'],
  computed: {
    size () {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return 200
      } else {
        return 100
      }
    },
    textClass () {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return 'display-3'
      } else {
        return 'headline'
      }
    }
  }
}
</script>

<style>
</style>
