<template>
  <div data-app>
    <v-avatar
        size="36px"
        class="avatar"
        @click="showProfileDialog = true"
    >
      <img
          alt="Avatar"
          src="https://de.bitcoinwiki.org/upload/de/images/thumb/e/eb/Metamask.png/250px-Metamask.png"
      >
    </v-avatar>
    <v-dialog
        v-model="showProfileDialog"
        width="500"
    >

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          User details
        </v-card-title>

        <v-card-text>
          <v-avatar
              size="80px"
          >
            <img
                alt="Avatar"
                src="https://de.bitcoinwiki.org/upload/de/images/thumb/e/eb/Metamask.png/250px-Metamask.png"
            >
          </v-avatar>
          <p class="text-caption mt-1">
            <strong>Address: </strong> {{ activeAccount }}
          </p>
          <p class="text-caption mt-1">
            <strong>Balance: </strong> {{ activeBalance }}
          </p>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              @click="showProfileDialog = false"
          >
            close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "Profile",
  data: () => ({
    showProfileDialog: false
  }),
  computed: {
    ...mapGetters("accounts", ["activeAccount", "activeBalance"]),
    ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),
    ...mapGetters("profile", ["getOwnedGnfs"]),
    userAccount() {
      return this.activeAccount
    },
    getEthBalance() {
      return this.drizzleInstance.web3.utils.fromWei(this.activeBalance, "ether");
    }
  },
  created() {
    this.$store.dispatch("profile/fetchOwnedGnfs");
  },
  methods: {
    ...mapActions("profile", ["fetchOwnedGnfs"]),

  }
}
</script>

<style scoped>
.avatar {
  cursor: pointer;
}
</style>