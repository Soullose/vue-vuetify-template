<template>
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
        <v-list dense nav>
          <v-list-item active-class="primary" color="white" to="/dashboard">
            <v-list-item-icon class="justify-center">
              <v-icon dense>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <span color="white" class="text-subtitle-2">首页</span>
            </v-list-item-title>
          </v-list-item>

          <v-list-item ctive-class="primary" color="white" to="/test11">
            <v-list-item-icon class="justify-center">
              <v-icon dense>mdi-account-box</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <span color="white" class="text-subtitle-2">测试11</span>
            </v-list-item-title>
          </v-list-item>

          <v-list-item ctive-class="primary" color="white" to="/test11">
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

            <v-list-item style="color: #187bf9; background-color: #eaf3ff" active-class="" color="blue-grey darken-3" to="/home">
              <v-list-item-icon class="justify-center">
                <v-icon dense>mdi-account-box</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <span color="black" class="text-subtitle-2">测试1</span>
              </v-list-item-title>
            </v-list-item>

            <v-list-item active-class="primary" color="white" to="/home">
              <v-list-item-icon class="justify-center">
                <v-icon color="primary" dense>mdi-account-box</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <span color="white" class="text-subtitle-2">测试2</span>
              </v-list-item-title>
            </v-list-item>

            <v-list-item active-class="primary" color="white" to="/home">
              <v-list-item-icon class="justify-center">
                <v-icon dense>mdi-account-box</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <span color="white" class="text-subtitle-2">测试3</span>
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
</template>

<script>
import { theme } from '@/framework/core/store/theme';
export default {
  data: () => ({
    software: {
      name: 'XXX管理系统',
      version: '2.6.1',
      company: 'Vuetify LLC'
    },
    user: {
      firstName: 'John',
      lastName: 'Doe'
    }
  }),

  computed: {
    asideMenuFolded() {
      return theme().getAsideMenuFolded;
    }
  }
};
</script>
