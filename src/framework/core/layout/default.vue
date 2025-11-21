<template>
  <v-main>
    <v-scroll-x-transition mode="out-in">
      <router-view />
    </v-scroll-x-transition>
  </v-main>
</template>

<script>
export default {
  name: 'DefaultLayout'
};
</script>
