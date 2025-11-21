<template>
  <div class="fill-height d-flex">
    <v-app-bar app elevation="4" light fixed flat extension-height="32" height="32">
      <template v-slot:img="{ props }">
        <!-- <v-img v-bind="props" gradient="135deg, rgba(18, 52, 126, 0.6) 60%, rgba(255, 0, 0, 0.3)" /> -->
        <v-img v-bind="props" />
      </template>
      <v-app-bar-nav-icon @click="toggleAsideMenuFolded" />

      <v-btn text rounded v-for="menu in menus" :key="menu.id" link :to="{ path: menu.path }" plain active-class="active-menu">
        {{ menu.name }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click="onToggleScreenfull" v-on="on" v-bind="attrs">
            <v-icon>{{ screenfull ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}</v-icon>
          </v-btn>
        </template>
        <span>{{ screenfull ? '退出全屏' : '全屏' }}</span>
      </v-tooltip>

      <v-menu offset-y left min-width="260" transition="slide-y-transition">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-badge color="red" light overlap dot bordered :content="messages.length">
              <v-icon>mdi-email-outline</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-card>
          <v-list dense class="pa-0">
            <v-subheader>消息中心</v-subheader>
            <v-divider />
            <v-list-item>
              <v-list-item-avatar></v-list-item-avatar>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>

      <v-menu offset-y left min-width="260" transition="slide-y-transition">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-badge color="red" light overlap dot bordered :content="messages.length">
              <v-icon>mdi-bell-outline</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-card>
          <v-list dense class="pa-0">
            <v-subheader>系统通知</v-subheader>
            <v-divider />
            <v-list-item>
              <v-list-item-avatar></v-list-item-avatar>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>

      <v-menu offset-y left bottom rounded transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-on="on" v-bind="attrs">
            <v-avatar light>
              <v-icon dark>mdi-account-circle</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list dense class="pa-0">
            <v-subheader>用户</v-subheader>
            <v-divider />
            <v-list-item>
              <v-list-item-avatar></v-list-item-avatar>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>

      <template v-slot:extension>
        <v-tabs height="30" optional background-color="transparent" class="mx-4" active-class="active-bookmark">
          <v-tabs-slider color="primary"></v-tabs-slider>
          <v-tab v-for="(bookmark, index) in bookmarks" :key="'bookmark_' + index" :to="{ path: bookmark.fullPath }">
            {{ bookmark.text }}
            <v-icon right small :disabled="bookmarks.length === 1">mdi-bookmark-remove</v-icon>
          </v-tab>
        </v-tabs>
        <!-- <div class="grow mx-n4 px-4 pa-4"></div> -->
      </template>
    </v-app-bar>

    <v-navigation-drawer app light fixed width="240" :miniVariant="asideMenuFolded" :expandOnHover="asideMenuFolded">
      <v-layout fill-height column>
        <v-list class="ml-2 py-0" two-line>
          <v-list-item class="px-0">
            <v-list-item-avatar class="my-2 mr-2">
              <v-img src="https://randomuser.me/api/portraits/lego/1.jpg" />
            </v-list-item-avatar>
            <v-list-item-content class="py-2">
              <v-list-item-title>
                <label class="text-blank text-subtitle-1 font-weight-regular mr-2">
                  {{ software.name }}
                </label>
                <label class="mr-3 text-caption black--text">
                  {{ software.version }}
                </label>
              </v-list-item-title>
              <v-list-item-subtitle class="d-inline-flex align-center font-weight-medium">
                <v-icon small left>mdi-account</v-icon>
                {{ user.firstName + user.lastName }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider />

        <div class="grow overflow-y-auto" style="height: 0px">
          <!-- <ac-aside-menu /> -->
          <v-list dense light nav>
            <v-list-item light active-class="primary--text" to="/test11">
              <v-list-item-icon class="justify-center">
                <v-icon dense>mdi-account-box</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <span class="text-subtitle-2">测试11</span>
              </v-list-item-title>
            </v-list-item>

            <v-list-item light active-class="primary--text" to="/test11">
              <v-list-item-icon class="justify-center">
                <v-icon dense>mdi-account-box</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <span class="text-subtitle-2 bg-red">测试22</span>
              </v-list-item-title>
            </v-list-item>

            <v-list-group active-class="primary--text" append-icon="mdi-chevron-down">
              <template v-slot:prependIcon>
                <v-icon>mdi-view-dashboard</v-icon>
              </template>
              <template v-slot:activator>
                <v-list-item-title>
                  <span class="text-subtitle-2">xxx</span>
                </v-list-item-title>
              </template>

              <v-list-item active-class="primary--text" to="/home">
                <v-list-item-icon class="justify-center">
                  <v-icon dense>mdi-account-box</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  <span class="text-subtitle-2">测试1</span>
                </v-list-item-title>
              </v-list-item>

              <v-list-item active-class="primary--text" to="/home">
                <v-list-item-icon class="justify-center">
                  <v-icon dense>mdi-account-box</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  <span class="text-subtitle-2">测试2</span>
                </v-list-item-title>
              </v-list-item>

              <v-list-item active-class="primary--text" to="/home">
                <v-list-item-icon class="justify-center">
                  <v-icon dense>mdi-account-box</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  <span class="text-subtitle-2">测试3</span>
                </v-list-item-title>
              </v-list-item>
            </v-list-group>
          </v-list>
        </div>

        <v-card>
          <div class="aside-panel-container"></div>
        </v-card>
      </v-layout>
    </v-navigation-drawer>

    <v-main class="grey lighten-3">
      <router-view />
    </v-main>

    <v-footer inset app light elevation="12" style="height: 48px">
      <v-spacer />
      <span class="text-body-2 mr-2">版权所有</span>
      <span class="text-body-2">{{ software.company }}</span>
    </v-footer>
  </div>
</template>

<script>
import screenfull from 'screenfull';

export default {
  name: 'HomeLayout',
  data: () => ({
    asideMenuFolded: false,
    menus: [
      {
        id: 1,
        name: 'Home',
        path: '/'
      },
      {
        id: 2,
        name: 'About',
        path: '/about'
      }
    ],
    showSearch: false,
    messages: [],
    selection: 1,
    software: {
      name: 'XXX管理系统',
      version: '2.6.1',
      company: 'Vuetify LLC'
    },
    user: {
      firstName: 'John',
      lastName: 'Doe'
    },
    screenfull: false,
    bookmarks: [
      {
        id: 1,
        text: 'Home',
        fullPath: '/'
      },
      {
        id: 2,
        text: 'About',
        fullPath: '/about'
      }
    ]
  }),

  methods: {
    toggleAsideMenuFolded() {
      this.asideMenuFolded = !this.asideMenuFolded;
      console.log('toggleAsideMenuFolded', this.asideMenuFolded);
    },
    onToggleScreenfull() {
      if (screenfull.isEnabled) {
        screenfull.toggle();
        this.screenfull = !this.screenfull;
      }
    }
  }
};
</script>
<style lang="scss">
// $footer-border-radius: 10 !default;
// $footer-elevation: 0 !default;
</style>
