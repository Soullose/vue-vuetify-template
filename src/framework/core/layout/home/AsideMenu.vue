<template>
  <v-list-group
    dense
    link
    scopedSlots="{scopedSlots}"
    appendIcon="mdi-chevron-down mdi-18px"
    staticClass="aside-menu__folder"
    activeClass="primary--text"
    group="{menu.path}"
  ></v-list-group>
</template>

<script>
export default {
  data: () => ({
    menu: {
      path: '',
      opened: false
    }
  })
};
</script>
