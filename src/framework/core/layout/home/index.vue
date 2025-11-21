<template>
  <div class="fill-height d-flex">
    <v-app-bar app absolute elevation="4" fixed flat extension-height="32" height="32">
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
            <v-badge color="red" overlap dot bordered :content="messages.length">
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
              <v-icon>mdi-account-circle</v-icon>
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
        <v-tabs show-arrows height="30" class="mx-1" optional prev-icon="mdi-cog">
          <v-tabs-slider></v-tabs-slider>
          <v-tab
            append
            tag="span"
            active-class="blue-grey lighten-4"
            v-for="(bookmark, index) in bookmarks"
            :key="'bookmark_' + index"
            :to="{ path: bookmark.fullPath }"
            @contextmenu.prevent="openContextMenu($event)"
          >
            {{ bookmark.text }}
            <v-icon right small :disabled="bookmark.length === 1">mdi-close-box</v-icon>
          </v-tab>
        </v-tabs>

        <!-- 右键菜单 -->
        <v-menu v-model="showContextMenu" :position-x="menuX" :position-y="menuY" absolute offset-y content-class="chrome-context-menu">
          <v-list dense>
            <v-list-item @click="refreshTab">
              <v-list-item-title>
                <v-icon small class="mr-2">mdi-refresh</v-icon>
                刷新
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="closeOtherTabs">
              <v-list-item-title>
                <v-icon small class="mr-2">mdi-close-box-multiple</v-icon>
                关闭其他标签页
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="closeRightTabs">
              <v-list-item-title>
                <v-icon small class="mr-2">mdi-arrow-right-bold-box</v-icon>
                关闭右侧标签页
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="closeAllTabs">
              <v-list-item-title>
                <v-icon small class="mr-2">mdi-close-box</v-icon>
                关闭所有标签页
              </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="pinTab">
              <v-list-item-title>
                <v-icon small class="mr-2">mdi-pin</v-icon>
                {{ currentContextTab?.pinned ? '取消固定' : '固定标签页' }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>

    <v-navigation-drawer app fixed width="240" :miniVariant="asideMenuFolded" :expandOnHover="asideMenuFolded">
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

    <v-main class="">
      <router-view />
    </v-main>

    <v-footer inset app color="white" elevation="12" style="height: 48px">
      <v-spacer />
      <span class="text-body-2 mr-2">版权所有</span>
      <span class="text-body-2">{{ software.company }}</span>
    </v-footer>
  </div>
</template>

<script>
import { theme } from '@/framework/core/store/theme';
import screenfull from 'screenfull';
export default {
  name: 'HomeLayout',
  created() {
    theme().setTheme('dark');
    console.log(theme().theme);
    console.log(theme().getAsideMenuFolded);
  },
  data: () => ({
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
        fullPath: '/home'
      },
      {
        id: 2,
        text: 'About',
        fullPath: '/about'
      }
    ],

    //当前在用的ITEM下标
    activeIndex: 0,
    defaultItems: [],
    showOperation: false,
    showOperationItem: null,
    x: 0,
    y: 0,
    operation: [
      {
        text: '关闭本页',
        type: 1
      },
      {
        text: '关闭其他页',
        type: 2
      },
      {
        text: '关闭所有页',
        type: 3
      }
    ],
    activeTab: 'home',
    showContextMenu: false,
    menuX: 0,
    menuY: 0,
    currentContextTab: null
  }),

  computed: {
    asideMenuFolded() {
      return theme().getAsideMenuFolded;
    }
  },

  methods: {
    toggleAsideMenuFolded() {
      theme().setAsideMenuFolded(!theme().getAsideMenuFolded);
    },
    onToggleScreenfull() {
      if (screenfull.isEnabled) {
        screenfull.toggle();
        this.screenfull = !this.screenfull;
      }
    },

    active(item, index) {
      this.activeIndex = index;
      if (item.fullPath === this.$route.path) {
        return;
      }
      this.$router.push({ path: item.fullPath });
    },
    close(item) {
      const preIndex = this.visitedItems.indexOf(item) - 1;
      this.$store.dispatch('visited/removeItem', item);
      this.active(this.visitedItems[preIndex], preIndex);
    },
    showOperationMenu(e, item) {
      e.preventDefault();
      if (!item.deletable) {
        return;
      }
      this.showOperation = false;
      this.showOperationItem = item;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showOperation = true;
      });
    },

    // 打开新标签页
    openNewTab(tab) {
      if (!this.tabs.some((t) => t.id === tab.id)) {
        this.tabs.push(tab);
      }
      this.activeTab = tab.id;
    },

    // 关闭标签页
    closeTab(tab) {
      const index = this.tabs.findIndex((t) => t.id === tab.id);
      if (index !== -1) {
        this.tabs.splice(index, 1);
        if (this.activeTab === tab.id) {
          this.activeTab = this.tabs[Math.max(0, index - 1)]?.id || null;
        }
      }
    },

    // 右键菜单
    openContextMenu(e) {
      this.currentContextTab = e;
      this.showContextMenu = false;
      this.menuX = e.clientX;
      this.menuY = e.clientY;
      this.$nextTick(() => {
        this.showContextMenu = true;
      });
    },

    // 空白区域右键菜单
    openEmptyAreaMenu(e) {
      this.currentContextTab = null;
      this.showContextMenu = false;
      this.menuX = e.clientX;
      this.menuY = e.clientY;
      this.$nextTick(() => {
        this.showContextMenu = true;
      });
    },

    // 刷新当前标签页
    refreshTab() {
      if (this.currentContextTab) {
        const tab = { ...this.currentContextTab, timestamp: Date.now() };
        const index = this.tabs.findIndex((t) => t.id === tab.id);
        this.tabs.splice(index, 1, tab);
        this.activeTab = tab.id;
      }
    },

    // 关闭其他标签页
    closeOtherTabs() {
      if (this.currentContextTab) {
        this.tabs = this.tabs.filter((tab) => tab.id === this.currentContextTab.id || tab.pinned);
        this.activeTab = this.currentContextTab.id;
      }
    },

    // 关闭右侧标签页
    closeRightTabs() {
      if (this.currentContextTab) {
        const index = this.tabs.findIndex((t) => t.id === this.currentContextTab.id);
        this.tabs = this.tabs.filter((tab, i) => i <= index || tab.pinned);
      }
    },

    // 关闭所有标签页
    closeAllTabs() {
      this.tabs = this.tabs.filter((tab) => tab.pinned);
      this.activeTab = this.tabs[0]?.id || null;
    },

    // 固定/取消固定标签页
    pinTab() {
      if (this.currentContextTab) {
        this.currentContextTab.pinned = !this.currentContextTab.pinned;
      }
    }
  }
};
</script>
<style lang="scss">
// $footer-border-radius: 10 !default;
// $footer-elevation: 0 !default;
</style>
<!-- 
<style scoped>
.bar-sheet {
  width: 100%;
}
.chip-group {
  max-width: calc(100% - 0);
  overflow-x: auto;
}
.chip-active {
  /*border-bottom: #85b71b solid 3px !important;*/
  border-bottom: #2a68c9 solid 2px !important;
}

.bar-chip {
  border-radius: 0 !important;
  height: 26px !important;
  margin-top: 2px !important;
  margin-bottom: 2px !important;
}

.bar-chip:hover {
  border-bottom: #2a68c9 solid 2px !important;
}

.operation-text {
  font-size: 12px;
  line-height: 18px;
  height: 18px;
}
</style> -->
