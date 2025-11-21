<template>
  <div class="fill-height d-flex">
    <header />

    <aside-menu />

    <v-main class="">
      <router-view />
    </v-main>
    <footer />
  </div>
</template>

<script>
export default {
  name: 'HomeLayout',
  created() {},
  data: () => ({}),

  computed: {},

  methods: {}
};
</script>
<style lang="scss">
// $footer-border-radius: 10 !default;
// $footer-elevation: 0 !default;
</style>
