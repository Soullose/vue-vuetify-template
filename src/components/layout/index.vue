<template>
  <div>
    <v-navigation-drawer app permanent fixed :miniVariant="theme.asideMenuFolded" :expandOnHover="theme.asideMenuFolded">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h5">Application</v-list-item-title>
          <v-list-item-subtitle>subtext</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark dense class="app-bar" elevation="0">
      <v-app-bar-nav-icon small @click.stop="theme.asideMenuFolded = !theme.asideMenuFolded">
        <v-icon>{{ toggleNavIcon }}</v-icon>
      </v-app-bar-nav-icon>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: '',
  computed: {
    ...mapState(['theme']),
    toggleNavIcon() {
      return this.theme.asideMenuFolded ? 'mdi-menu' : 'mdi-menu-open';
    }
  },
  data() {
    return {
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped></style>
