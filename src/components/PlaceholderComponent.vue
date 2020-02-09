<template>
  <v-container
    style="margin: 15%">
    <span
      style="color: teal"
      class="display-3">
      {{message}}
    </span>
    <v-icon
      color="primary"
      size="200">
      {{icon}}
    </v-icon>
  </v-container>
</template>

<script>
export default {
  name: 'PlaceholderComponent',
  props: ['icon', 'message']
}
</script>

<style>

</style>
