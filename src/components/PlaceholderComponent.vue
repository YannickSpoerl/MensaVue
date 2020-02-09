<template>
  <v-row>
    <v-col>
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
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'PlaceholderComponent',
  props: ['icon', 'message']
}
</script>

<style>

</style>
