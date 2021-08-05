<template>
  <div>
    <v-app-bar
        color="cyan darken-3"
        dense
        dark
    >
      <v-toolbar-title><b>GAMING NFTS</b></v-toolbar-title>

      <v-spacer></v-spacer>

      <Profile />

    </v-app-bar>
  </div>
</template>

<script>
import Profile from '@/components/Profile'
export default {
  name: "Header",
  components: {
    Profile
  },
}
</script>

<style scoped>

</style>