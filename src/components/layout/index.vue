<template>
  <div>
    <v-navigation-drawer app permanent fixed :miniVariant="theme.asideMenuFolded" :expandOnHover="theme.asideMenuFolded">
      <v-list class="py-1" two-line>
        <v-list-item class="px-0">
          <v-list-item-avatar class="my-2 ml-4 mr-2">
            <v-img :src="require('@/assets/logo.svg')" />
          </v-list-item-avatar>
          <v-list-item-content class="py-2">
            <v-list-item-title class="text-h5">
              <label class="text-blank text-h6 font-weight-bold">ww</label>
              <label class="ml-1 mr-3 text-md-body-1 grey--text">1.0.0</label>
            </v-list-item-title>
            <v-list-item-subtitle>WangSF</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
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

    <v-app-bar app fixed elevation="4">
      <v-app-bar-nav-icon small @click.stop="theme.asideMenuFolded = !theme.asideMenuFolded">
        <!-- <v-icon>{{ toggleNavIcon }}</v-icon> -->
      </v-app-bar-nav-icon>
      <v-spacer />
      <!-- 搜索栏 -->
      <!-- <v-expand-x-transition>
        <v-btn dense icon @click="showSearch = true" v-if="!showSearch">
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
      </v-expand-x-transition> -->

      <!-- 用户消息 -->
      <!-- <v-menu offset-y left min-width="260" transition="slide-y-transition">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" :disabled="messages.length === 0">
            <v-icon v-if="messages.length === 0">mdi-email-outline</v-icon>
            <v-badge v-else color="red" light overlap dot bordered>
              <v-icon>mdi-email-outline</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-card>
          <v-list dense class="pa-0">
            <v-subheader>用户消息</v-subheader>
            <v-divider />
            <v-list-item>
              <v-list-item-avatar></v-list-item-avatar>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu> -->

      <!-- 系统通知 -->
      <!-- <v-menu offset-y left min-width="260" transition="slide-y-transition">
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" :disabled="notifications.length === 0">
                    <v-icon v-if="notifications.length === 0">mdi-bell-outline</v-icon>
                    <v-badge v-else color="red" light overlap dot bordered>
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
        </v-menu> -->

      <v-menu bottom offset-y rounded="0" transition="scale-transition" origin="bottom">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mr-1" small icon v-bind="attrs" v-on="on">
            <v-avatar color="#b9cdef" size="32">
              <img :src="require('@/assets/logo.svg')" alt="" />
              <span class="white--text text-h6">WangSF</span>
            </v-avatar>
          </v-btn>
        </template>
        <!-- <v-list dense>
          <v-list-item v-for="(operation, index) in actions" :key="index" @click="doAction(operation)">
            <v-list-item-title>{{ operation.text || operation.action }}</v-list-item-title>
          </v-list-item>
        </v-list> -->
      </v-menu>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-on="on" v-bind="attrs">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>退出系统</span>
      </v-tooltip>
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
