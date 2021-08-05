<template>
  <v-container>
    <v-row>
      <v-subheader>Nft list</v-subheader>
    </v-row>
    <v-row>
    <v-col
        v-for="(item, i) in getOwnedGnft"
        :key="i"
        class="col-md-2"
    >
      <Item v-bind:gnft="item" />
    </v-col>
    </v-row>
  </v-container>

</template>

<script>
import { mapGetters } from "vuex";
import Item from '@/components/Item'

export default {
  name: "ItemContainer",
  components: {
    Item
  },
  computed: {
    ...mapGetters("accounts", ["activeAccount", "activeBalance"]),
    ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),
    ...mapGetters("profile", ["getOwnedGnft"]),
  },
}
</script>

<style scoped>

</style>