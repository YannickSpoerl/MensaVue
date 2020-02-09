<template>
   <v-card
   style="margin-right: 10px">
    <v-card-title
    style="word-break: normal"
    class="font-weight-light"
    >
      <v-avatar
                size="85"
                tile
              >
       <v-icon
      color="primary"
      size="85">
      {{icon}}
    </v-icon></v-avatar>
      {{meal.canteen}}</v-card-title>
      <v-card-title style="word-break: normal" class="headline">{{meal.name}}</v-card-title>
    <v-card-text>
      <v-row
        justify="center"
      >
        <div class="subtitle-1">{{meal.category}}</div>
      </v-row>
    </v-card-text>
    <div
      v-if="meal.notes.length > 0">
          <v-divider></v-divider>
          <v-card-title>Tags:</v-card-title>
    <v-card-text>
      <v-chip-group>
        <v-chip
          v-for="note in meal.notes"
          :key="note"
          color="primary">
          {{note}}</v-chip>
      </v-chip-group>
    </v-card-text>
    </div>
    <div
      v-if="prices.length > 0">
       <v-divider></v-divider>
    <v-card-title>Prices:</v-card-title>
    <v-simple-table>
    <template v-slot:default>
      <tbody>
        <tr v-for="price in prices" :key="price.name">
          <td>{{ price.name }}</td>
          <td>{{ price.amount }}€</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'MealComponent',
  props: ['meal', 'icon'],
  computed: {
    prices () {
      let prices = []
      for (let price in this.meal.prices) {
        if (this.meal.prices[price]) {
          prices.push({
            name: price,
            amount: this.meal.prices[price]
          })
        }
      }
      return prices
    },
    splitIndex () {
      if (this.meal.name.length < 30) {
        return this.meal.name.length
      }
      for (let i = 30; i < this.meal.name.length - 1; i++) {
        if (this.meal.name[i] === ' ') {
          return i
        }
      }
      return this.meal.name.length
    }
  }
}
</script>

<style>
</style>
