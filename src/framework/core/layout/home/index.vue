<template>
  <v-app>
    <v-app-bar app elevation="1" color="primary" fixed flat dark src="https://picsum.photos/1920/1080?random">
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
      </template>

      <!-- <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <v-toolbar-title class="text-h4">Vuetify</v-toolbar-title>
      </div> -->

      <v-app-bar-nav-icon @click="toggleAsideMenuFolded" />

      <v-btn text v-for="menu in menus" :key="menu.id" :to="{ path: menu.path }" link rounded plain active-class="active-menu">
        {{ menu.name }}
      </v-btn>
      <v-spacer></v-spacer>

      <!-- <transition name="slide-fade" :mode="'out-in'">
        <v-btn dense icon v-if="!showSearch" @click="showSearch = true">
          <v-icon>mdi-home-search-outline</v-icon>
        </v-btn>
        <div class="w-md" v-else>
          <v-text-field
            autofocus
            class="hidden-sm-and-down"
            placeholder="搜索 ..."
            hide-details
            rounded
            color="rgba(192, 192, 192, 1)"
            background-color="rgba(192, 192, 192, 0.6)"
            flat
            prepend-inner-icon="mdi-home-search-outline"
            @blur="showSearch = false"
          />
        </div>
      </transition> -->

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

      <v-menu transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="transparent" class="ma-2 white--text" depressed v-bind="attrs" v-on="on">
            Login
            <v-icon right dark>mdi-login</v-icon>
          </v-btn>
        </template>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="showAsideMenu" app color="primary" fixed width="240" :miniVariant="asideMenuFolded" :expandOnHover="asideMenuFolded">
      <v-img
        slot="img"
        src="https://picsum.photos/1920/1080?random"
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        style="width: 100%; height: 100%"
        dark
      />
      <v-layout fill-height column>
        <v-list class="py-1" two-line>
          <v-list-item class="px-0">
            <v-list-item-avatar class="my-2 mr-2">
              <v-img src="https://randomuser.me/api/portraits/lego/1.jpg" />
            </v-list-item-avatar>
            <v-list-item-content class="py-2">
              <v-list-item-title>
                <label class="text-blank text-h6 font-weight-bold mr-2">
                  {{ software.name }}
                </label>
                <label class="text-caption black--text">
                  {{ software.version }}
                </label>
              </v-list-item-title>
              <v-list-item-subtitle class="d-inline-flex align-center">
                <v-icon small left>mdi-account-tie</v-icon>
                {{ user.firstName + user.lastName }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider />

        <div class="grow overflow-y-auto" style="height: 0px">
          <ac-aside-menu />
        </div>

        <v-card>
          <div class="aside-panel-container"></div>
        </v-card>
      </v-layout>
    </v-navigation-drawer>

    <v-main class="grey lighten-3">
      <router-view />
    </v-main>

    <v-footer inset app light style="height: 48px" class="align-center">
      <v-spacer />
      <span class="text-body-2 mr-2">版权所有</span>
      <span class="text-body-2">{{ software.company }}</span>
    </v-footer>
  </v-app>
</template>

<script>
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
      name: 'Vuetify',
      version: '2.6.1',
      company: 'Vuetify LLC'
    },
    user: {
      firstName: 'John',
      lastName: 'Doe'
    }
  }),

  methods: {
    toggleAsideMenuFolded() {
      this.asideMenuFolded = !this.asideMenuFolded;
      console.log('toggleAsideMenuFolded', this.asideMenuFolded);
    }
  }
};
</script>
