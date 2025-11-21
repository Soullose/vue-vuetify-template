<template>
  <div class="grey lighten-4">
    <v-sheet class="grey lighten-4">
      <!-- 页签栏 -->
      <v-tabs height="30" optional class="grey lighten-4" active-class="active-bookmark">
        <v-tabs-slider></v-tabs-slider>
        <v-tab
          append
          v-for="(bookmark, index) in bookmarks"
          :key="'bookmark_' + index"
          :to="{ path: bookmark.fullPath }"
          @contextmenu.prevent="openContextMenu($event, tab)"
        >
          <!-- <div class="tab-content">
          <div class="status-dot" :class="{ active: activeTab === tab.id }"></div>

          <span class="tab-title">{{ tab.title }}</span>

          <v-icon small class="tab-close" @click.stop="closeTab(tab)">mdi-close</v-icon>
        </div> -->

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
    </v-sheet>
  </div>
</template>

<script>
export default {
  data: () => ({
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
    tabs: [
      {
        id: 'home',
        title: '首页',
        icon: 'https://www.google.com/favicon.ico',
        type: 'web',
        url: '/home',
        pinned: true
      }
    ],
    activeTab: 'home',
    showContextMenu: false,
    menuX: 0,
    menuY: 0,
    currentContextTab: null
  }),

  methods: {
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
    openContextMenu(e, tab) {
      this.currentContextTab = tab;
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

<style lang="scss" scoped>
// .tabs-container {
//   flex: 1;
//   margin-left: 20px;
//   overflow-x: auto;
// }

// .enhanced-tabs {
//   min-height: 48px;
//   background: rgba(255, 255, 255, 0.1);

//   .custom-tab {
//     padding: 0 20px !important;
//     margin: 0 2px;
//     height: 48px;
//     background: rgba(255, 255, 255, 0.2);
//     border-radius: 8px 8px 0 0;
//     transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//     position: relative;

//     &::before {
//       content: '';
//       position: absolute;
//       top: 0;
//       left: 0;
//       right: 0;
//       bottom: 0;
//       background: rgba(255, 255, 255, 0.1);
//       opacity: 0;
//       transition: opacity 0.3s;
//     }

//     &:hover {
//       background: rgba(255, 255, 255, 0.3);

//       &::before {
//         opacity: 1;
//       }

//       .tab-close {
//         opacity: 1;
//       }
//     }

//     &.v-tab--active {
//       background: #ffffff;
//       box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);

//       .tab-title {
//         color: #1a73e8;
//       }

//       .status-dot {
//         background: #4caf50;
//         box-shadow: 0 0 8px rgba(76, 175, 80, 0.4);
//       }
//     }

//     .tab-content {
//       display: flex;
//       align-items: center;
//       gap: 8px;
//       height: 100%;

//       .status-dot {
//         width: 8px;
//         height: 8px;
//         border-radius: 50%;
//         background: rgba(255, 255, 255, 0.5);
//         transition: all 0.3s;

//         &.active {
//           background: #4caf50;
//         }
//       }

//       .tab-title {
//         font-size: 14px;
//         font-weight: 500;
//         color: rgba(255, 255, 255, 0.9);
//         white-space: nowrap;
//       }

//       .tab-close {
//         opacity: 0;
//         color: rgba(0, 0, 0, 0.6);
//         transition: all 0.3s;
//         margin-left: 8px;

//         &:hover {
//           color: #d32f2f;
//           transform: scale(1.1);
//         }
//       }
//     }
//   }
// }

// // 活动状态页签的特殊样式
// .v-tab--active {
//   .tab-title {
//     color: #1a73e8 !important;
//   }

//   .tab-close {
//     opacity: 1 !important;
//   }
// }
</style>
