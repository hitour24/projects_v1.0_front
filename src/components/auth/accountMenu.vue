<template>
  <div>
    <v-row
      style="touch-action: none !important"
      align="center"
      class="pa-4"
      no-gutters
      justify="start"
    >
      <v-col cols="auto">
        <v-btn
          style="font-size: 20px"
          class="mr-3"
          elevation="0"
          color="primary"
          fab
          >{{ generateAvatar() }}</v-btn
        >
      </v-col>
      <v-col>
        <h3>
          {{
            this.$auth.user()
              ? "name" in this.$auth.user()
                ? decodeURIComponent(this.$auth.user().name)
                : "undefined"
              : "undefined"
          }}
          {{
            this.$auth.user()
              ? "sername" in this.$auth.user()
                ? decodeURIComponent(this.$auth.user().sername)
                : "undefined"
              : "undefined"
          }}
        </h3>
        <v-row no-gutters title="Роль в системе">
          <v-icon class="mr-1">mdi-shield-account-outline</v-icon>
          <span class="subtitle-1 grey--text">{{
            this.$auth.user()
              ? "role_title" in this.$auth.user()
                ? this.$auth.user().role_title
                : "undefined"
              : "undefined"
          }}</span>
        </v-row>
        <v-row no-gutters title="Эл. почта">
          <span class="subtitle-1 grey--text">{{
            this.$auth.user()
              ? "login" in this.$auth.user()
                ? this.$auth.user().login
                : "undefined"
              : "undefined"
          }}</span>
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row no-gutters>
      <v-list class="w-100" style="touch-action: none !important">
        <!-- <v-list-item-group color="primary"> -->
        <v-list-item
          @click="$router.push({ path: '/settings' }).catch(() => {})"
        >
          <v-list-item-title>Настройки учетной записи</v-list-item-title>
        </v-list-item>
        <v-divider class="my-2"></v-divider>
        <v-list-item @click="$auth.logout()">
          <v-list-item-title> Выйти </v-list-item-title>
        </v-list-item>
        <!-- </v-list-item-group> -->
      </v-list>
    </v-row>
  </div>
</template>
<script>
import Helper from "./../../plugins/helper";
export default {
  data() {
    return {};
  },
  methods: {
    ...Helper,
  },
};
</script>