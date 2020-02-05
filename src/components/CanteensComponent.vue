<template>
  <v-content>
    <v-row
      justify="center">
      <v-col
        cols="4"
        v-for="(canteen, index) in canteens"
        :key="canteen.id">
        <v-card
          max-height="135">
          <div
            class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline"
                v-text="canteen.name">
              </v-card-title>
              <v-card-subtitle v-text="canteen.address"></v-card-subtitle>
            </div>
            <v-avatar
              size="80"
              tile>
              <div v-if="canteen.open">
                <span  style="color: teal">Open</span>
                <v-icon color="primary">mdi-silverware</v-icon>
              </div>
              <div v-if="!canteen.open">
                <span style="color: red">Closed</span>
                <v-icon color="red">mdi-silverware</v-icon>
              </div>
            </v-avatar>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              dark text
              color="primary"
              @click="closeCanteen(index)">
              Remove
              <v-icon
                right>
                mdi-close
              </v-icon>
            </v-btn>
          </v-card-actions>
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
