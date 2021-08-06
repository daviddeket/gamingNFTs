<template>
  <v-card>
    <v-card-text>
      <p v-html="gnft.svg"></p>
      <p>
        <strong>Strength: </strong>{{ gnft.strength }}<br>
        <strong>Cost: </strong>{{ gnft.cost }}<br>
        <strong>Type: </strong>{{ gnft.type }}<br>
        <strong>Rarity: </strong>{{ gnft.rarity }}
      </p>
    </v-card-text>
    <v-card-actions>
      <v-text-field
          v-model="price"
          type="number"
          label="Name"
          required
      ></v-text-field>
      <v-btn
          outlined
          rounded
          text
          @click=""
      >
        Button
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Item",
  props: {
    gnft: {
      type: Object
    }
  },
  data: () =>({
    price: 0
  }),
  methode: {
    setAsPurchasable() {

    }
  }
}
</script>

<style scoped>

</style>