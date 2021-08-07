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
    <v-card-actions v-if="gnft.purchasePrice <= 0 && gnft.currentIsOwner">
      <v-container>
        <form>
          <v-text-field
              v-model="price"
              type="number"
              label="price"
              required
          ></v-text-field>
          <v-btn
              outlined
              rounded
              text
              @click="setAsPurchasable()"
          >
            add to market
          </v-btn>
        </form>
      </v-container>
    </v-card-actions>
    <v-card-actions v-else-if="gnft.purchasePrice > 0 && gnft.currentIsOwner">
      <v-container>
        <v-btn
            outlined
            rounded
            text
            @click="unSetAsPurchasable()"
        >
          remove<br>from market
        </v-btn>
      </v-container>
    </v-card-actions>
    <v-card-actions v-else-if="gnft.purchasePrice > 0 && !gnft.currentIsOwner">
      <v-container>
        <v-btn
            outlined
            rounded
            text
            @click="buyGnft()"
        >
          <div>
            buy for <i>{{ drizzleInstance.web3.utils.fromWei(gnft.purchasePrice.toString(), "ether") }} Eth</i>
          </div>
        </v-btn>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

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
  computed: {
    ...mapGetters("accounts", ["activeAccount", "activeBalance"]),
    ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),
    ...mapGetters("profile", ["getGnfts"]),
  },
  methods: {
    ...mapActions("profile", ["fetchOwnedGnft", "setPurchasable", "unSetPurchasable", "buyGnft"]),
    async setAsPurchasable() {
      await this.$store.dispatch("profile/setPurchasable", { tokenId: this.gnft.tokenId, price: this.price });
      await this.$store.dispatch("profile/fetchOwnedGnft");
    },
    async unSetAsPurchasable() {
      await this.$store.dispatch("profile/unSetPurchasable", this.gnft.tokenId);
      await this.$store.dispatch("profile/fetchOwnedGnft");
    },
    async buyGnft() {
      await this.$store.dispatch("profile/buyGnft", { tokenId: this.gnft.tokenId, price: this.gnft.purchasePrice });
      await this.$store.dispatch("profile/fetchOwnedGnft");
    }
  }
}
</script>

<style scoped>

</style>