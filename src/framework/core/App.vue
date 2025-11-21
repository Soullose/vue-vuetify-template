<template>
  <!-- <div flex-auto flex flex-col min-h-vh max-w-full backface-hidden position-relative>
    <router-view />
  </div> -->
  <v-app>
    <!-- <v-main> -->
    <router-view />
    <!-- </v-main> -->
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  })
};
</script>
