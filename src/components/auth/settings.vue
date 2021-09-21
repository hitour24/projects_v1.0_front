<template>
  <div>
    <v-row no-gutters>
      <v-col sm="auto" style="min-width: 300px" class="pa-3">
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
        <v-list class="ml-3">
          <v-list-item-group v-model="selectSection">
            <v-row
              class="w-100"
              no-gutters
              v-for="(section, name) in sections"
              :key="name"
            >
              <v-list-item :disabled="loadInput">
                <v-list-item-title>
                  <v-row no-gutters align="center" justify="start">
                    <v-icon class="mr-3">{{ section.icon }}</v-icon>
                    {{ section.title }}
                  </v-row>
                </v-list-item-title>
              </v-list-item>
            </v-row>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col style="min-width: 300px" sm class="pa-4">
        <v-skeleton-loader
          max-width="780"
          min-width="300"
          v-if="loadInput"
          type="table-heading, list-item-three-line"
        ></v-skeleton-loader>

        <v-row
          v-for="(more, name) in sectionMore"
          :key="name"
          style="max-width: 760px"
          no-gutters
        >
          <h3 class="w-100 mb-3">{{ more.title }}</h3>

          <div class="w-100">
            <div v-for="(__more, name) in more.data" :key="name" class="w-100">
              <v-row align="start" no-gutters class="w-100">
                <v-col class="mb-3">
                  <h4 class="w-100">{{ __more.title }}</h4>
                  <!-- width out inputs -->
                  <div
                    v-if="!__more.edit && !__more.inputs"
                    class="w-100 subtitle-1"
                  >
                    {{ __more.label ? __more.label : __more.model }}
                  </div>

                  <!-- inputs -->
                  <div v-if="!__more.edit && __more.inputs" class="w-100 mt-2">
                    <div v-for="(inpt, name) in __more.inputs" :key="name">
                      <div class="subtitle-1">
                        <v-icon>{{ inpt.icon }}</v-icon>
                        {{ inpt.title }}
                      </div>
                      <div class="subtitle-2 grey--text ml-6">
                        {{
                          inpt.model === "" || !inpt.model ? " - " : inpt.model
                        }}
                      </div>
                    </div>
                  </div>

                  <!-- inputs requisits -->
                  <!-- <v-text-field hide-details id="suggest"></v-text-field> -->
                  <!-- <v-row no-gutters v-if="__more.edit && __more.inputs">
                    <v-form class="w-100" ref="formSaveData">
                      <v-alert
                        dense
                        text
                        style="font-size: 14px !important"
                        color="red"
                        class="mt-4"
                        :value="alertErrorSignIn"
                      >
                        {{ err }}
                      </v-alert>
                      <v-col
                        v-for="(inp, name) in __more.inputs"
                        :key="name"
                        cols="auto"
                        class="mr-3 mt-3 pa-0"
                      >
                        <v-text-field
                          :id="inp.name === 'address' ? 'suggest' : ''"
                          :type="inp.type"
                          :rules="[rules.required]"
                          dense
                          hide-details
                          outlined
                          :placeholder="inp.title"
                          v-model="inp.model"
                          :prepend-inner-icon="inp.icon"
                          :disabled="loading"
                        ></v-text-field>
                      </v-col>

                      <v-col class="pa-0" cols="auto">
                        <v-btn
                          @click="
                            __more.edit = false;
                            __more.reset();
                          "
                          elevation="0"
                          class="new-btn mr-3 mt-2"
                          light
                          >Отмена</v-btn
                        >
                        <v-btn
                          @click="
                            () => {
                              if ($refs.formSaveData[0].validate()) {
                                __more.action(__more.inputs, __more);
                              }
                            }
                          "
                          :loading="loading"
                          elevation="0"
                          class="new-btn mt-2"
                          color="primary"
                          >Сохранить</v-btn
                        >
                      </v-col>
                    </v-form>
                  </v-row> -->

                  <!-- without inputs -->
                  <v-row no-gutters v-if="__more.edit && !__more.inputs">
                    <v-form class="w-100" ref="formSaveData">
                      <v-alert
                        dense
                        text
                        style="font-size: 14px !important"
                        color="red"
                        class="mt-4"
                        :value="alertErrorSignIn"
                      >
                        {{ err }}
                      </v-alert>
                      <v-col cols="auto" class="mr-3 mt-1 pa-0">
                        <v-text-field
                          :type="__more.type"
                          :rules="__more.required ? [rules.required] : []"
                          dense
                          hide-details
                          outlined
                          v-model="__more.model"
                          :placeholder="__more.placeholderEdit"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        v-if="__more.type === 'password'"
                        cols="auto"
                        class="mr-3 mt-2 pa-0"
                      >
                        <v-text-field
                          :type="__more.type"
                          :rules="[rules.required]"
                          dense
                          hide-details
                          outlined
                          v-model="__more.modelCheck"
                        ></v-text-field>
                      </v-col>
                      <v-col class="pa-0" cols="auto">
                        <v-btn
                          @click="
                            __more.edit = false;
                            __more.reset();
                          "
                          elevation="0"
                          class="new-btn mr-3 mt-2"
                          light
                          >Отмена</v-btn
                        >
                        <v-btn
                          @click="
                            () => {
                              if ($refs.formSaveData[0].validate()) {
                                __more.action(__more.model, __more);
                              }
                            }
                          "
                          :disabled="
                            __more.type === 'password'
                              ? __more.modelCheck !== '' &&
                                __more.model !== '' &&
                                __more.modelCheck === __more.model
                                ? false
                                : true
                              : false
                          "
                          :loading="loading"
                          elevation="0"
                          class="new-btn mt-2"
                          color="primary"
                          >Сохранить</v-btn
                        >
                      </v-col>
                    </v-form>
                  </v-row>
                </v-col>
                <v-col cols="auto"
                  ><v-btn
                    v-if="!__more.edit"
                    elevation="0"
                    light
                    @click="
                      () => {
                        if (!__more.auth) {
                          __more.edit = true;
                        } else {
                          modalSequrity = true;
                          editFiled = { more: more, name: name };
                        }
                      }
                    "
                    class="new-btn"
                    >{{ __more.btn }}</v-btn
                  >
                </v-col>
              </v-row>
              <v-divider class="my-5"></v-divider>
            </div>
          </div>
        </v-row>
      </v-col>
    </v-row>

    <v-dialog
      style="touch-action: pan-y !important"
      v-model="modalSequrity"
      scrollable
      max-width="400"
    >
      <v-row no-gutters justify="center" align="center" class="h-100 w-100">
        <v-card
          elevation="0"
          width="400"
          max-width="400"
          class="pa-10 rounded-lg"
        >
          <v-btn
            class="close-btn"
            icon
            light
            @click="
              () => {
                modalSequrity = false;
                resetValidateSignIn();
                password = '';
                this.alertErrorSignIn = false;
                this.err = '';
              }
            "
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-row no-gutters justify="center">
            <v-card-title
              style="word-break: keep-all"
              class="h1 pa-0 text-center font-weight-bold"
              >Подтвердите текущий пароль</v-card-title
            >
            <v-card-text style="word-break: keep-all" class="text-center pt-4"
              >Чтобы обновить настройки учетной записи, нужно подтвердить
              пароль.</v-card-text
            >
            <v-form class="w-100" ref="formSignIn">
              <v-alert
                dense
                text
                style="font-size: 14px !important"
                color="red"
                class="mt-4"
                :value="alertErrorSignIn"
              >
                {{ err }}
              </v-alert>
              <v-text-field
                placeholder="Пароль"
                :rules="[rules.required]"
                hide-details
                dense
                type="password"
                class="w-100"
                v-model="password"
                outlined
              ></v-text-field>
              <v-row justify="center" class="mt-4" no-gutters align="center">
                <v-col sm class="pr-1">
                  <v-btn
                    @click="
                      () => {
                        modalSequrity = false;
                        resetValidateSignIn();
                        password = '';
                        this.alertErrorSignIn = false;
                        this.err = '';
                      }
                    "
                    block
                    elevation="0"
                    light
                    class="mt-2 new-btn"
                    >Отмена</v-btn
                  >
                </v-col>
                <v-col sm class="pl-1">
                  <v-btn
                    block
                    :loading="loading"
                    :disabled="loading"
                    @click="signIn"
                    elevation="0"
                    color="primary"
                    class="mt-2 new-btn"
                    >Подтвердить пароль</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </v-row>
        </v-card>
      </v-row>
    </v-dialog>
  </div>
</template>

<script>
import authVal from "./auth_val";
import authPalugin from "./../../plugins/auth";
import Helper from "./../../plugins/helper";
export default {
  data() {
    return authVal;
  },
  mounted() {
    this.selectSection = -1;
  },
  watch: {
    selectSection(v) {
      console.log(v);
      this.sectionMore = {};
      this.err = "";
      this.alertErrorSignIn = false;
      this.loadInput = false;
      this.findTags = [];
      switch (v) {
        case 0:
          this.getAccountData();
          break;
        case 1:
          this.getSequrity();
          break;
        // case 2:
        //   this.getRequisites();
        //   break;
        // case 3:
        //   this.getOrders();
        //   break;
        // case 4:
        //   this.findByTag();
        //   break;
        default:
          break;
      }
      // this.$auth.fetchUser();
      // this.$auth.refresh();
    },
  },
  methods: {
    ...authPalugin,
    ...Helper,
    async signIn() {
      if (this.validateSignIn()) {
        this.err = "";
        this.loading = true;
        this.alertErrorSignIn = false;
        const body = {
          email:
            this.$auth.user() && "login" in this.$auth.user()
              ? this.$auth.user().login
              : "",
          password: this.password,
        };
        await this.checkPassword(body);
        this.loading = false;
        this.modalSequrity = false;
        this.resetValidateSignIn();
        this.password = "";
        this.alertErrorSignIn = false;
        this.err = "";
        this.sectionMore[this.editFiled["more"]["name"]]["data"][
          this.editFiled["name"]
        ].edit = true;
      }
    },

    async saveName(data, more) {
      this.err = "";
      this.loading = true;
      this.alertErrorSignIn = false;
      const body = {
        name: data,
      };
      await this.updateName(body, more);
      this.loading = false;
      this.alertErrorSignIn = false;
      this.err = "";
      more.edit = false;
      this.$auth.fetchUser();
      this.$auth.refresh();
    },

    async saveSername(data, more) {
      this.err = "";
      this.loading = true;
      this.alertErrorSignIn = false;
      const body = {
        sername: data,
      };
      await this.updateSername(body, more);
      this.loading = false;
      this.alertErrorSignIn = false;
      this.err = "";
      more.edit = false;
      this.$auth.fetchUser();
      this.$auth.refresh();
    },

    async saveSecondname(data, more) {
      this.err = "";
      this.loading = true;
      this.alertErrorSignIn = false;
      const body = {
        secondname: data === "" ? " - " : data,
      };
      await this.updateSecondName(body, more);
      this.loading = false;
      this.alertErrorSignIn = false;
      this.err = "";
      more.edit = false;
      this.$auth.fetchUser();
      this.$auth.refresh();
    },

    async saveContacts(data, more) {
      this.err = "";
      this.loading = true;
      this.alertErrorSignIn = false;
      const body = {
        contacts: data,
      };
      await this.updateContacts(body, more);
      this.loading = false;
      this.alertErrorSignIn = false;
      this.err = "";
      more.edit = false;
      this.$auth.fetchUser();
      this.$auth.refresh();
    },

    async saveEmail(data, more) {
      this.err = "";
      this.loading = true;
      this.alertErrorSignIn = false;
      const body = {
        email: data,
      };
      await this.updateLogin(body, more);
      this.loading = false;
      this.alertErrorSignIn = false;
      this.err = "";
      more.edit = false;
      this.$auth.fetchUser();
      this.$auth.refresh();
    },

    async savePassword(data, more) {
      this.err = "";
      this.loading = true;
      this.alertErrorSignIn = false;
      const body = {
        password: data,
      };
      await this.updatePassword(body, more);
      this.loading = false;
      this.alertErrorSignIn = false;
      this.err = "";
      more.edit = false;
      // this.$auth.fetchUser();
      // this.$auth.refresh();
      this.$auth.logout();
    },

    resetValidateSignIn() {
      this.$refs.formSignIn.reset();
    },
    validateSignIn() {
      return this.$refs.formSignIn.validate();
    },
    getAccountData() {
      console.log("get data acc");
      this.loadInput = true;
      this.sectionMore = {};
      const name = decodeURIComponent(
        this.$auth.user() && "name" in this.$auth.user()
          ? this.$auth.user().name
          : " - "
      );
      const sername = decodeURIComponent(
        this.$auth.user() && "sername" in this.$auth.user()
          ? this.$auth.user().sername
          : " - "
      );
      const secondname = decodeURIComponent(
        this.$auth.user() && "secondname" in this.$auth.user()
          ? this.$auth.user().secondname
          : " - "
      );
      const email = decodeURIComponent(
        this.$auth.user() && "login" in this.$auth.user()
          ? this.$auth.user().login
          : " - "
      );
      const contacts = decodeURIComponent(
        this.$auth.user() && "contacts" in this.$auth.user()
          ? this.$auth.user().contacts
          : " - "
      );
      this.sectionMore = {
        account: {
          name: "account",
          title: "Учетная запись",
          data: {
            name: {
              type: "text",
              name: "name",
              title: "Имя",
              btn: "Редактировать",
              action: this.saveName,
              reset: this.getAccountData,
              required: true,
              model: name,
              edit: false,
              auth: false,
              placeholderEdit: "Имя",
            },
            sername: {
              type: "text",
              name: "sername",
              title: "Фамилия",
              btn: "Редактировать",
              required: true,
              action: this.saveSername,
              reset: this.getAccountData,
              model: sername,
              edit: false,
              auth: false,
              placeholderEdit: "Фамилия",
            },
            secondname: {
              type: "text",
              name: "secondname",
              title: "Отчество",
              btn: "Редактировать",
              action: this.saveSecondname,
              reset: this.getAccountData,
              model: secondname,
              edit: false,
              auth: false,
              placeholderEdit: "Фамилия",
            },
            email: {
              type: "text",
              name: "email",
              title: "Адрес электронной почты",
              btn: "Редактировать",
              required: true,
              action: this.saveEmail,
              reset: this.getAccountData,
              model: email,
              edit: false,
              auth: true,
              placeholderEdit: "Email",
            },
            contacts: {
              type: "text",
              name: "contacts",
              title: "Контакты",
              btn: "Редактировать",
              required: false,
              action: this.saveContacts,
              reset: this.getAccountData,
              model: contacts,
              edit: false,
              auth: false,
              placeholderEdit: "Контакты",
            },
          },
        },
      };
      console.log(this.sectionMore);
      this.loadInput = false;
    },

    getSequrity() {
      this.loadInput = true;
      this.sectionMore = {};
      const dateUpdate =
        this.$auth.user() && "update_date" in this.$auth.user()
          ? new Date(this.$auth.user().update_date)
              .toLocaleString("ru-RU")
              .split(", ")[0]
          : " - ";
      this.sectionMore = {
        sequrity: {
          name: "sequrity",
          title: "Безопасность",
          data: {
            password: {
              name: "password",
              title: "Пароль",
              btn: "Обновить",
              action: this.savePassword,
              type: "password",
              modelCheck: "",
              required: true,
              reset: this.getSequrity,
              model: "",
              label: `Дата последнего обновления пароля: ${dateUpdate}`,
              edit: false,
              auth: true,
              placeholderEdit: "Пароль",
            },
          },
        },
      };
      this.loadInput = false;
    },
  },
};
</script>
