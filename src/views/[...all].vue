<script lang="ts">
export default defineComponent({
  name: 'ErrorPage'
});
</script>

<template>
  <div>
    <div class="wrapper">
      <!-- <v-icon class="logo mb-4">mdi-alert-circle</v-icon> -->
      <p class="text-h2 transition-swing">404 Not Found</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  top: calc(50vh - 250px);
  text-align: center;
  opacity: 0.6;
}
.logo {
  font-size: 12em;
  opacity: 1;
}
</style>
