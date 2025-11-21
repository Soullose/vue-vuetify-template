<template>
  <div class="fill-height" flex-auto flex flex-col min-h-vh max-w-full backface-hidden position-relative pa-0 ma-0 float-right box-inherit>
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
