<template>
  <div>
    <v-app-bar color="#fff" app absolute elevation="4" fixed flat extension-height="32" height="32">
      <!-- <template v-slot:img="{ props }">
      <v-img v-bind="props" gradient="135deg, rgba(29, 125, 234, 100) 100%, rgba(21, 118, 247, 100)" />
    </template> -->
      <v-app-bar-nav-icon color="primary" @click="toggleAsideMenuFolded" />

      <!-- <v-btn color="#f5f5f5" text rounded v-for="menu in menus" :key="menu.id" link :to="{ path: menu.path }" plain active-class="active-menu">
        {{ menu.name }}
      </v-btn> -->

      <!-- <v-breadcrumbs :items="menus">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item color="white" :to="item.path" :disabled="item.disabled">
            {{ item.name.toUpperCase() }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs> -->

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click="onToggleScreenfull" v-on="on" v-bind="attrs">
            <v-icon color="primary">{{ screenfull ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}</v-icon>
          </v-btn>
        </template>
        <span>{{ screenfull ? '退出全屏' : '全屏' }}</span>
      </v-tooltip>

      <v-menu offset-y left min-width="260" transition="slide-y-transition">
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn icon v-on="{ ...menu, ...tooltip }" v-bind="attrs">
                <v-badge color="red darken-3" overlap dot bordered :content="messages.length">
                  <v-icon color="primary">mdi-email-outline</v-icon>
                </v-badge>
              </v-btn>
            </template>
            <span>消息中心</span>
          </v-tooltip>
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
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn icon v-bind="attrs" v-on="{ ...tooltip, ...menu }">
                <v-badge color="red darken-3" overlap dot bordered :content="messages.length">
                  <v-icon color="primary">mdi-bell-outline</v-icon>
                </v-badge>
              </v-btn>
            </template>
            <span>系统通知</span>
          </v-tooltip>
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
              <v-icon color="primary">mdi-account-circle</v-icon>
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
            active-class="white"
            v-for="(bookmark, index) in bookmarks"
            :key="'bookmark_' + index"
            :to="{ path: bookmark.fullPath }"
            @contextmenu.prevent="openContextMenu($event)"
          >
            <span color="primary">{{ bookmark.text }}</span>
            <v-icon color="primary" right small :disabled="bookmark.length === 1">mdi-close-box</v-icon>
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
  </div>
</template>

<script>
import { theme } from '@/framework/core/store/theme';
import screenfull from 'screenfull';
export default {
  name: 'Header',
  data: () => ({
    // asideMenuFolded: false,
    menus: [
      {
        id: 1,
        name: 'Home',
        path: '/home',
        disabled: false
      },
      {
        id: 2,
        name: 'About',
        path: '/about',
        disabled: false
      }
    ],
    // showSearch: false,
    messages: [],
    // selection: 1,
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
    showOperation: false,
    showOperationItem: null,
    x: 0,
    y: 0,
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
      if (!this.bookmarks.some((t) => t.id === tab.id)) {
        this.bookmarks.push(tab);
      }
      this.activeTab = tab.id;
    },

    // 关闭标签页
    closeTab(tab) {
      const index = this.bookmarks.findIndex((t) => t.id === tab.id);
      if (index !== -1) {
        this.bookmarks.splice(index, 1);
        if (this.activeTab === tab.id) {
          this.activeTab = this.bookmarks[Math.max(0, index - 1)]?.id || null;
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
        const index = this.bookmarks.findIndex((t) => t.id === tab.id);
        this.bookmarks.splice(index, 1, tab);
        this.activeTab = tab.id;
      }
    },

    // 关闭其他标签页
    closeOtherTabs() {
      if (this.currentContextTab) {
        this.bookmarks = this.bookmarks.filter((tab) => tab.id === this.currentContextTab.id || tab.pinned);
        this.activeTab = this.currentContextTab.id;
      }
    },

    // 关闭右侧标签页
    closeRightTabs() {
      if (this.currentContextTab) {
        const index = this.bookmarks.findIndex((t) => t.id === this.currentContextTab.id);
        this.bookmarks = this.bookmarks.filter((tab, i) => i <= index || tab.pinned);
      }
    },

    // 关闭所有标签页
    closeAllTabs() {
      this.bookmarks = this.bookmarks.filter((tab) => tab.pinned);
      this.activeTab = this.bookmarks[0]?.id || null;
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
$app-bar-border-radius: 8 !default;
</style>
