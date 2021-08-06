<template>
  <v-container>
    <v-row>
      <v-subheader class="itemContainerHeader">Your objects</v-subheader>
    </v-row>
    <v-row>
      <v-col
          v-for="(item, i) in getGnfts"
          :key="i"
          class="col-md-2"
      >
        <Item v-bind:gnft="item" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <newGnft/>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Item from '@/components/Item'
import NewGnft from '@/components/NewGnft'

export default {
  name: "ItemContainer",
  components: {
    Item,
    NewGnft
  },
  computed: {
    ...mapGetters("accounts", ["activeAccount", "activeBalance"]),
    ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),
    ...mapGetters("profile", ["getGnfts"]),
  },
  methods: {
    ...mapActions("profile", ["fetchOwnedGnft"]),
  }
}
</script>

<style scoped>
.itemContainerHeader {
  font-size: 1.5em;
}
</style>