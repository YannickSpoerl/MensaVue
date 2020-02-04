<template>
  <v-content>
    <v-row justify="center">
      <v-col cols="3" v-for="(canteen, index) in canteens" :key="canteen.id">
        <v-card>
          <v-btn
                color="red"
                dark
                small
                absolute
                top
                right
                fab
                @click="closeCanteen(index)">
               <v-icon>mdi-minus</v-icon>
               </v-btn>
          <v-card-title>
            {{canteen.name}}
            </v-card-title>
          <v-card-text>
            <span>{{canteen.address}}</span></v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
export default {
  name: 'CanteensComponent',
  props: ['canteens'],
  methods: {
    closeCanteen (canteen) {
      this.$emit('close', canteen)
    }
  }
}
</script>

<style>
</style>
