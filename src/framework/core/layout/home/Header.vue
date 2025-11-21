<template>
  <v-app-bar app elevation="1" light fixed flat height="64">
    <v-app-bar-nav-icon @click="toggleAsideMenuFolded" />

    <v-btn text v-for="menu in menus" :key="menu.id" :to="{ path: menu.path }" link rounded plain active-class="active-menu">
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
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
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
    ]
  })
};
</script>
