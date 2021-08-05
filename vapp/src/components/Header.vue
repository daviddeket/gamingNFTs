<template>
  <div>
    <v-app-bar
        color="deep-purple accent-4"
        dense
        dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>GAMING NFTS</v-toolbar-title>

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