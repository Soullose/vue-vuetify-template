<template>
  <div>
    <v-navigation-drawer app permanent fixed :miniVariant="theme.asideMenuFolded" :expandOnHover="theme.asideMenuFolded" style="z-index: 9999">
      <v-list class="py-1" two-line>
        <v-list-item class="px-0">
          <v-list-item-avatar class="my-2 ml-4 mr-2">
            <v-img :src="require('@/assets/logo.svg')" />
          </v-list-item-avatar>
          <v-list-item-content class="py-2">
            <v-list-item-title class="title text-h5">
              <label class="text-blank text-h6 font-weight-bold">ww</label>
              <label class="ml-1 mr-3 text-md-body-1 grey--text">1.0.0</label>
            </v-list-item-title>
            <v-list-item-subtitle>WangSF</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- <v-divider></v-divider> -->

      <v-list dense :nav="!theme.asideMenuFolded">
        <v-list-item class="px-2" v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app fixed elevation="4" style="height: auto !important; z-index: 999 !important">
      <v-app-bar-nav-icon small @click.stop="theme.asideMenuFolded = !theme.asideMenuFolded">
        <!-- <v-icon>{{ toggleNavIcon }}</v-icon> -->
      </v-app-bar-nav-icon>
      <!-- 面包屑导航 -->
      <v-breadcrumbs :items="breadcrumbs">
        <template v-slot:divider>
          <v-icon>mdi-forward</v-icon>
        </template>
      </v-breadcrumbs>

      <v-toolbar-title v-if="false">
        <v-img height="20" width="98" :src="require('@/assets/logo.svg')" />
        <div class="font-weight-bold" v-if="false">WW</div>
      </v-toolbar-title>

      <v-spacer />

      <v-menu bottom offset-y left rounded="0" transition="scale-transition" origin="bottom">
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar color="primary" size="48">
              <span class="white--text text-h5">SF</span>
            </v-avatar>
          </v-btn>
        </template>

        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <!-- <v-avatar color="primary">
                <span class="white--text text-h5">SF</span>
              </v-avatar> -->
              <h3>WangSF</h3>
              <p class="text-caption mt-1">sxxxx@123.com</p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text>个人中心</v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text>退出系统</v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click="$emit('search')" v-on="on" v-bind="attrs">
            <v-icon>
              {{ screenfull ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}
            </v-icon>
          </v-btn>
        </template>
        <span>{{ screenfull ? '退出全屏' : '全屏' }}</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-on="on" v-bind="attrs">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>退出系统</span>
      </v-tooltip>

      <template v-slot:extension></template>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Layout',
  mounted() {
    console.log('menus:', this.$store.state.framework.menus);
  },
  computed: {
    ...mapState(['theme']),
    ...mapState('framework', ['menus']),
    toggleNavIcon() {
      return this.theme.asideMenuFolded ? 'mdi-menu' : 'mdi-menu-open';
    }
  },
  data() {
    return {
      screenfull: false,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' }
      ],
      actions: [
        {
          text: '个人中心'
          // action: '/usercenter'
        },
        {
          text: '登出',
          action: 'logout',
          method: true
        }
      ],
      breadcrumbs: [
        {
          text: 'Dashboard',
          disabled: true,
          href: 'breadcrumbs_dashboard'
        },
        {
          text: 'Link 1',
          disabled: true,
          href: 'breadcrumbs_link_1'
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2'
        }
      ]
    };
  },
  methods: {
    isScreenfull() {
      this.screenfull = !this.screenfull;
    }
  }
};
</script>

<style lang="scss" scoped></style>
