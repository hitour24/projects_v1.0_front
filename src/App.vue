<template>
  <div>
    <v-app>
      <v-navigation-drawer
        :mobile-breakpoint="0"
        :mini-variant.sync="mini"
        dark
        app
      >
        <!-- <v-toolbar-title color="text--white">Система отчетов</v-toolbar-title> -->
        <v-list dense app>
          <!-- <v-list-group> -->
          <v-list-item-group
            dark
            @change="
              () => {
                subMenuModel = null;
              }
            "
          >
            <router-link
              v-for="item in menu.filter(
                (f) =>
                  !f.sub_items &&
                  ($auth.roles() !== 'admin'
                    ? ![
                        'Настройки',
                        'Пользователи',
                        'Цели',
                        'Продукты',
                      ].includes(f.name)
                    : 1 === 1)
              )"
              :key="item.name"
              tag="v-list-item"
              :to="item.path"
              active-class="active"
              exact
            >
              <!-- <v-list-item link> -->
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="text-xs">
                  {{ item.name }}</v-list-item-title
                >
              </v-list-item-content>
              <!-- </v-list-item> -->
            </router-link>

            <!-- *** RIGHTS ***** -->
            <!-- Разрешаем настройки только для админа -->
            <v-list-group
              v-for="(item, index) in menu.filter(
                (f) =>
                  f.sub_items &&
                  ($auth.roles() !== 'admin'
                    ? !['Настройки', 'Пользователи'].includes(f.name)
                    : 1 === 1)
              )"
              :key="index"
              v-model="item.model"
              no-action
              color=""
            >
              <template v-slot:activator>
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-xs">
                    {{ item.name }}</v-list-item-title
                  >
                </v-list-item-content>
              </template>

              <v-list-item-group dark v-model="subMenuModel">
                <router-link
                  v-for="child in item.sub_items"
                  :key="child.name"
                  tag="v-list-item"
                  :to="child.path"
                  active-class="active"
                  exact
                >
                  <v-list-item-icon>
                    <v-icon></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="text-xs">
                      {{ child.name }}</v-list-item-title
                    >
                  </v-list-item-content>
                </router-link>
              </v-list-item-group>
            </v-list-group>
          </v-list-item-group>
        </v-list>

        <template v-slot:append>
          <p v-if="!mini" class="text-center white--text caption">
            Produced by MagicSoft 2021
          </p>
        </template>
      </v-navigation-drawer>

      <v-app-bar :dark="mini" flat app>
        <!-- {{ drawer }} - {{ mini }} -->
        <v-app-bar-nav-icon @click.stop="mini = !mini"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-col v-if="!this.$auth.check()" cols="auto" class="d-none d-md-flex">
          <v-btn
            @click="$router.push({ path: 'login' }).catch(() => {})"
            elevation="0"
            class="new-btn mr-3"
            light
            >Войти</v-btn
          >
          <v-btn
            elevation="0"
            color="primary"
            @click="$router.push({ path: 'register' }).catch(() => {})"
            class="new-btn"
            >Зарегистрироваться</v-btn
          >
        </v-col>
        <v-col cols="auto" class="d-none d-md-flex" v-if="this.$auth.check()">
          <v-menu :close-on-content-click="false" left offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                style="font-size: 20px"
                class="ml-3"
                elevation="0"
                color="primary"
                small
                fab
                >{{ generateAvatar() }}</v-btn
              >
            </template>
            <div style="min-width: 320px; z-index: 2" class="white">
              <Account />
            </div>
          </v-menu>
        </v-col>
      </v-app-bar>

      <v-main>
        <router-view></router-view>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import { mdiCogOutline } from "@mdi/js";
import Account from "./components/auth/accountMenu";
import Helper from "./plugins/helper";
export default {
  components: {
    Account,
  },
  data() {
    return {
      subMenuModel: null,
      drawer: null,
      mini: true,
      menu: [
        {
          name: "Проекты",
          path: "/",
          disabled: false,
          icon: "mdi-view-split-vertical",
        },
        {
          name: "Цели",
          path: "/objectives",
          disabled: false,
          icon: "mdi-image-filter-center-focus",
        },
        {
          name: "Продукты",
          path: "/products",
          disabled: false,
          icon: "mdi-cube-outline",
        },
        {
          name: "Пользователи",
          path: "/members",
          disabled: false,
          icon: "mdi-account-multiple-outline",
        },
        {
          name: "Настройки",
          path: "/settings",
          model: null,
          disabled: false,
          sub_items: [
            {
              name: "Справочники",
              path: "/settings/catalogs",
              disabled: false,
            },
          ],
          icon: mdiCogOutline,
        },
      ],
    };
  },
  methods: {
    ...Helper,
  },
};
</script>

<style>
.w-100 {
  width: 100%;
}
.new-btn {
  text-transform: none !important;
  text-decoration: none !important;
  font-size: 16px !important;
  letter-spacing: 0 !important;
  text-indent: 0 !important;
}
.link-btn {
  text-transform: none !important;
  text-decoration: underline !important;
  letter-spacing: 0 !important;
  text-indent: 0 !important;
}
.close-btn {
  position: absolute !important;
  right: 10px !important;
  top: 10px !important;
}
.h-100 {
  height: 100%;
}
.main-menu-main {
  background: #fff !important;
}
.active_menu {
  color: white !important;
}
</style>

