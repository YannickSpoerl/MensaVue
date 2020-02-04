<template>
  <ul>
    <li :key="canteen.id" v-for="canteen in canteens">
      {{canteen.name}}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CanteensComponent',
  props: ['canteens']
}
</script>

<style>
</style>
