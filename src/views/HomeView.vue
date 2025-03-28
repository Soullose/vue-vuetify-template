<template>
  <hello-world />
</template>

<script>
import HelloWorld from '../components/HelloWorld';

export default {
  name: 'Home',

  components: {
    HelloWorld
  }
};
</script>
<route>
  {
    path: "/home",
    meta: {
      requiresAuth: false,
      title: "HelloVuetify",
      description: "HelloVuetify description",
      keepAlive: false
    }
  }
  </route>
