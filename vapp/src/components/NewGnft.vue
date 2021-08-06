<template>
  <form>
    <v-text-field
        v-model="gnftData"
        label="Name"
        required
    ></v-text-field>
    <v-btn
        class="mr-4"
        @click="createGnft()"
    >
      create Gnft
    </v-btn>
  </form>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NewGnft",
  data: () => ({
    gnftData: ''
  }),
  computed: {
    ...mapGetters("accounts", ["activeAccount", "activeBalance"]),
    ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),
    ...mapGetters("profile", ["getGnfts"]),
  },
  methods: {
    ...mapActions("profile", ["fetchOwnedGnft", "mintGnft"]),
    async createGnft() {
      await this.$store.dispatch("profile/mintGnft", this.gnftData);
      await this.$store.dispatch("profile/fetchOwnedGnft");
    }
  }
}
</script>

<style scoped>
.itemContainerHeader {
  font-size: 1.5em;
}
</style>