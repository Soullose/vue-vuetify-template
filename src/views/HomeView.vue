<template>
  <hello-world />
</template>

<script>
export default {
  name: 'Home'
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
