<template>
  <v-app>
    <div v-if="isDrizzleInitialized" id="app">
      <Header />
    </div>
    <div v-else>Loading...</div>
  </v-app>
</template>

<script>
import Header from '@/components/Header'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    Header
  },

  computed: mapGetters('drizzle', ['isDrizzleInitialized'])
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
