<template>
  <div>
    <div class="ma-3">
      <v-overlay opacity="0.8" z-index="10000" :value="loadSubCatalog">
        <v-row no-gutters justify="center">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-row>
        <v-row class="mt-3" no-gutters justify="center">
          <span class="subhead">Идет загрузка данных...</span>
        </v-row>
      </v-overlay>
      <v-row no-gutters>
        <!-- <v-col cols="auto" sm="3">
          <h1>Проект</h1>
        </v-col>
        <v-col cols="auto" style="width: 50px">
          <span></span>
        </v-col> -->
        <v-col cols="auto" sm>
          <!-- <v-toolbar dark color="teal"> -->
          <v-form ref="formProjectData">
            <v-col
              v-for="unitForm in formProject"
              :key="unitForm.name"
              cols="12"
              :sm="unitForm.block"
              :class="`pa-1 ${
                unitForm.type === 'head_select' ? 'sticky_head' : ''
              }`"
            >
              <v-row no-gutters class="w-100">
                <!-- Левая часть -->
                <v-col cols="12" md="3">
                  <h1 v-if="unitForm.type === 'head_select'">Проект</h1>
                  <div
                    v-else-if="unitForm.type === 'list'"
                    cols="12"
                    style="word-break: break-all; font-size: 14px !important"
                    :class="`pa-4 font-weight-bold h-100 ${unitForm.color}`"
                  >
                    {{ unitForm.description }}
                  </div>
                </v-col>
                <!-- <v-col cols="1" class="max-width:30px"
                ><span v-if="ind === 0">№ в иерархии</span>
                <span v-else></span>
              </v-col> -->
                <v-col cols="12" md>
                  <v-row
                    no-gutters
                    align="center"
                    v-if="unitForm.type === 'head_select'"
                  >
                    <v-col cols="12" md="9">
                      <v-text-field
                        :rules="[rules.required]"
                        v-if="$route.query.id && $route.query.id === 'new'"
                        class="head_big_font"
                        background-color="light-green accent-3"
                        flat
                        solo
                        hide-no-data
                        placeholder="Название проекта"
                        hide-details
                        v-model="unitForm.model"
                      >
                      </v-text-field>

                      <v-text-field
                        :rules="[rules.required]"
                        v-else-if="mode === 'edit'"
                        class="head_big_font"
                        background-color="light-green accent-3"
                        flat
                        solo
                        hide-no-data
                        placeholder="Название проекта"
                        hide-details
                        v-model="unitForm.text"
                      >
                      </v-text-field>

                      <v-autocomplete
                        v-else
                        @change="getDataProject"
                        class="head_big_font"
                        background-color="light-green accent-3"
                        flat
                        solo
                        hide-no-data
                        hide-details
                        :loading="loadSubCatalog"
                        :disabled="mode === 'edit'"
                        :items="allProjects"
                        v-model="unitForm.model"
                        item-text="title"
                        item-value="id"
                      >
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" md>
                      <v-btn
                        block
                        large
                        :loading="loadingStartEdit"
                        @click="mode = 'edit'"
                        class="new-btn"
                        text
                        v-if="
                          unitForm.type === 'head_select' &&
                          mode === 'view' &&
                          permission()
                        "
                        color="primary"
                      >
                        Редактировать
                      </v-btn>
                      <v-row
                        no-gutters
                        v-if="
                          unitForm.type === 'head_select' && mode === 'edit'
                        "
                      >
                        <v-col cols="6">
                          <v-btn
                            block
                            large
                            @click="cancelEditProject"
                            class="new-btn"
                            text
                            color="red"
                          >
                            Отмена
                          </v-btn>
                        </v-col>
                        <v-col cols="6">
                          <v-btn
                            block
                            large
                            @click="saveEditProject"
                            class="new-btn"
                            text
                            color="success"
                          >
                            {{
                              $route.query.id && $route.query.id === "new"
                                ? "Создать"
                                : "Сохранить"
                            }}
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>

                  <v-textarea
                    :readonly="mode !== 'edit'"
                    :disabled="mode !== 'edit'"
                    hide-details
                    auto-grow
                    v-if="unitForm.type === 'textarea'"
                    rows="1"
                    v-model="unitForm.model"
                    :placeholder="unitForm.title"
                  >
                  </v-textarea>

                  <v-list
                    class="py-1"
                    v-if="unitForm.type === 'list'"
                    append
                    flat
                    :ref="unitForm.ref"
                    :color="unitForm.color"
                    style="
                      word-break: break-all;
                      position: relative;
                      font-size: 14px !important;
                    "
                  >
                    <v-btn
                      v-if="mode === 'edit'"
                      fab
                      color="primary"
                      class="control_button"
                      dark
                      elevation="0"
                      x-small
                      :ripple="false"
                      @click="addEntityLocal(unitForm)"
                    >
                      <v-icon>mdi-plus-thick</v-icon>
                    </v-btn>

                    <template
                      v-for="(item, index) in unitForm.data.filter(
                        (f) => !f.remove
                      )"
                    >
                      <v-list-item
                        :key="index + 100 / 25"
                        :ref="item.ref"
                        class="item_raw"
                        style="position: relative; font-size: 14px !important"
                      >
                        <v-btn
                          v-if="mode === 'edit'"
                          fab
                          color="red lighten-1"
                          class="control_button_remove"
                          dark
                          elevation="0"
                          x-small
                          :ripple="false"
                          @click="removeEntityLocal(unitForm, item)"
                        >
                          <v-icon>{{ icons.minus }}</v-icon>
                        </v-btn>

                        <v-list-item-icon class="mr-3 my-2">
                          {{ item.hierarchy }}
                        </v-list-item-icon>
                        <v-list-item-content class="py-1">
                          <v-list-item-title>
                            <v-row dense>
                              <v-col cols="12" sm="4">
                                <v-text-field
                                  placeholder="Название"
                                  style="
                                    color: rgba(0, 0, 0, 1) !important;
                                    font-weight: 700 !important;
                                    font-size: 14px !important;
                                  "
                                  lisght
                                  :solo="mode === 'edit'"
                                  :solo-inverted="mode !== 'edit'"
                                  :readonly="mode !== 'edit'"
                                  :disabled="mode !== 'edit'"
                                  dense
                                  flat
                                  hide-details="auto"
                                  :rules="[rules.required]"
                                  v-model="item.title"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="8"
                                style="position: relative"
                              >
                                <v-textarea
                                  placeholder="Описание"
                                  style="font-size: 14px !important"
                                  dense
                                  rows="1"
                                  auto-grow
                                  light
                                  :solo="mode === 'edit'"
                                  :solo-inverted="mode !== 'edit'"
                                  :readonly="mode !== 'edit'"
                                  :disabled="mode !== 'edit'"
                                  :append-outer-icon="
                                    (unitForm.name === 'products_0' ||
                                      unitForm.name === 'products_1' ||
                                      unitForm.name === 'products_2' ||
                                      unitForm.name === 'products_3' ||
                                      unitForm.name === 'products_4' ||
                                      unitForm.name === 'products_5') &&
                                    mode === 'edit'
                                      ? 'mdi-chevron-down'
                                      : ''
                                  "
                                  @click:append-outer="
                                    () => {
                                      item.accom = item.accom == 0 ? 1 : 0;
                                      unitForm.data = unitForm.data.filter(
                                        (f) => !f.remove
                                      );
                                      openModeAddit(item);
                                    }
                                  "
                                  flat
                                  hide-details="auto"
                                  v-model="item.description"
                                ></v-textarea>
                                <!-- <v-btn
                                  class="addnal-button"
                                  v-if="
                                    (unitForm.name === 'products_0' ||
                                      unitForm.name === 'products_1' ||
                                      unitForm.name === 'products_2' ||
                                      unitForm.name === 'products_3' ||
                                      unitForm.name === 'products_4' ||
                                      unitForm.name === 'products_5') &&
                                    mode === 'edit'
                                  "
                                  icon
                                  small
                                  ><v-icon>mdi-chevron-down</v-icon></v-btn
                                > -->
                              </v-col>
                            </v-row>
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            <!-- <v-textarea
                              placeholder="Описание"
                              style="font-size: 14px !important"
                              dense
                              rows="1"
                              auto-grow
                              light
                              :readonly="mode !== 'edit'"
                              :disabled="mode !== 'edit'"
                              flat
                              hide-details="auto"
                              v-model="item.description"
                            ></v-textarea> -->
                            <!-- Выбор родительского пункта -->
                            <v-autocomplete
                              @change="generateHierarchy"
                              placeholder="Родительский пункт"
                              style="
                                color: rgba(0, 0, 0, 1) !important;
                                font-weight: 700 !important;
                                font-size: 14px !important;
                              "
                              light
                              dense
                              clearable
                              flat
                              hide-details="auto"
                              v-model="item.parent"
                              :items="
                                unitForm.data.filter(
                                  (f) =>
                                    !f.remove &&
                                    f.index !== item.index &&
                                    item.index > f.index &&
                                    f.title
                                )
                              "
                              :item-text="
                                (el) => {
                                  return `${el.hierarchy} - ${el.title}`;
                                }
                              "
                              item-value="index"
                              v-if="
                                mode === 'edit' &&
                                unitForm.data.find(
                                  (f) =>
                                    !f.remove &&
                                    f.index !== item.index &&
                                    item.index > f.index &&
                                    f.title
                                )
                              "
                            ></v-autocomplete>
                            <!-- Ссылка на финальный продукт -->

                            <v-expansion-panels
                              v-model="item.accom"
                              class="mt-2"
                              flat
                              v-if="
                                (unitForm.name === 'products_0' ||
                                  unitForm.name === 'products_1' ||
                                  unitForm.name === 'products_2' ||
                                  unitForm.name === 'products_3' ||
                                  unitForm.name === 'products_4' ||
                                  unitForm.name === 'products_5') &&
                                mode === 'edit'
                              "
                            >
                              <v-expansion-panel>
                                <!-- <v-expansion-panel-header>
                                  Дополнительно
                                </v-expansion-panel-header> -->
                                <v-expansion-panel-content>
                                  <v-text-field
                                    placeholder="Ссылка на финальный продукт"
                                    style="
                                      color: rgba(0, 0, 0, 1);
                                      font-weight: 700 !important;
                                      font-size: 14px !important;
                                    "
                                    light
                                    :readonly="mode !== 'edit'"
                                    :disabled="mode !== 'edit'"
                                    dense
                                    flat
                                    hide-details="auto"
                                    v-model="item.finished_product"
                                  ></v-text-field>
                                  <!-- Дата добавления -->
                                  <div>
                                    <v-menu
                                      v-for="dateProduct in [
                                        {
                                          title: 'Дата добавления',
                                          name: 'date_create',
                                        },
                                        {
                                          title: 'Дата завершения (приемки)',
                                          name: 'date_completion',
                                        },
                                        {
                                          title: 'Дата исключения, заморозки',
                                          name: 'date_frozen',
                                        },
                                      ]"
                                      :key="dateProduct.name"
                                      :close-on-content-click="true"
                                      transition="scale-transition"
                                      offset-y
                                      min-width="auto"
                                    >
                                      <template
                                        v-slot:activator="{ on, attrs }"
                                      >
                                        <v-text-field
                                          class="pt-0"
                                          v-model="item[dateProduct.name]"
                                          prepend-inner-icon="mdi-calendar"
                                          style="
                                            color: rgba(0, 0, 0, 1);
                                            font-weight: 700 !important;
                                            font-size: 14px !important;
                                          "
                                          light
                                          :readonly="mode !== 'edit'"
                                          :disabled="mode !== 'edit'"
                                          dense
                                          flat
                                          :placeholder="dateProduct.title"
                                          v-bind="attrs"
                                          hide-details="auto"
                                          v-on="on"
                                        ></v-text-field>
                                      </template>

                                      <v-date-picker
                                        no-title
                                        v-model="item[dateProduct.name]"
                                      ></v-date-picker>
                                    </v-menu>
                                  </div>
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                            </v-expansion-panels>
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <!-- <v-divider
                        :key="index + 1000 / 25"
                        v-if="index < unitForm.data.length - 1"
                      ></v-divider> -->
                    </template>

                    <!-- </template> -->
                  </v-list>

                  <div v-if="unitForm.type === 'label_input_block'">
                    <v-col
                      cols="12"
                      :sm="unitForm.block"
                      style="font-size: 14px"
                    >
                      <v-row align="end" class="pa-1 grey lighten-5">
                        <v-col
                          v-for="label_input in unitForm.data"
                          :key="label_input.name"
                          :md="label_input.block"
                          cols="12"
                          style="position: relative"
                          class="pa-2 item_raw_member"
                        >
                          <!-- <v-row no-gutters align="start"> -->

                          <span v-if="label_input.type !== 'checkbox'">
                            {{ label_input.title }}</span
                          >

                          <v-text-field
                            :rules="
                              label_input.required ? [rules.required] : []
                            "
                            :readonly="mode !== 'edit'"
                            :disabled="mode !== 'edit'"
                            flat
                            style="
                              color: rgba(0, 0, 0, 1) !important;
                              font-weight: 700 !important;
                              font-size: 14px !important;
                            "
                            class="pt-0"
                            v-if="
                              label_input.type === 'text' &&
                              unitForm.name !== 'members'
                            "
                            v-model="label_input.model"
                            background-color="white"
                            hide-details
                            cols="auto"
                          >
                            {{ label_input.model }}
                          </v-text-field>

                          <v-text-field
                            style="
                              color: rgba(0, 0, 0, 1);
                              font-weight: 700 !important;
                              font-size: 14px !important;
                            "
                            @click="
                              dialogAddMember = true;
                              dialogAddMemberData = label_input.model;
                            "
                            :rules="
                              label_input.required ? [rules.required] : []
                            "
                            readonly
                            :disabled="mode !== 'edit'"
                            flat
                            class="pt-0"
                            v-if="
                              label_input.type === 'text' &&
                              unitForm.name === 'members'
                            "
                            v-model="label_input.value"
                            background-color="white"
                            hide-details
                            cols="auto"
                          >
                            {{ label_input.value }}
                          </v-text-field>

                          <v-checkbox
                            :readonly="mode !== 'edit'"
                            :disabled="mode !== 'edit'"
                            style="
                              font-size: 14px !important;
                              color: rgba(0, 0, 0, 1) !important;
                              font-weight: 700 !important;
                            "
                            dense
                            class="mt-2 pt-0"
                            hide-details
                            :label="label_input.title"
                            v-if="label_input.type === 'checkbox'"
                            v-model="label_input.model"
                          ></v-checkbox>

                          <v-autocomplete
                            style="
                              font-size: 14px !important;
                              font-weight: 700 !important;
                              color: rgba(0, 0, 0, 1);
                            "
                            :readonly="mode !== 'edit'"
                            :disabled="mode !== 'edit'"
                            flat
                            @change="changeSelect(label_input)"
                            class="pt-0"
                            hide-details
                            background-color="white"
                            v-if="label_input.type === 'select'"
                            :multiple="label_input.multi"
                            :rules="
                              label_input.required ? [rules.required] : []
                            "
                            :loading="loadSubCatalog"
                            :items="label_input.items ? label_input.items : []"
                            v-model="label_input.model"
                            :item-text="label_input.itemText"
                            :item-value="label_input.itemValue"
                            :return-object="label_input.returnObject"
                          >
                            <template
                              v-slot:prepend
                              v-if="
                                mode === 'edit' &&
                                unitForm.name === 'members' &&
                                label_input.addTempItemIcon
                              "
                            >
                              <v-dialog
                                persistent
                                scrollable
                                max-width="400px"
                                v-model="label_input.modalAddNew"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn
                                    fab
                                    color="green lighten-1"
                                    class="control_button_add_member"
                                    dark
                                    elevation="0"
                                    x-small
                                    v-bind="attrs"
                                    v-on="on"
                                    :ripple="false"
                                    @click="
                                      dialogAddMemberData = {
                                        name: null,
                                        sername: null,
                                        login: null,
                                        id:
                                          -1 *
                                          (1 +
                                            label_input.items.filter(
                                              (fid) => fid.id < 0
                                            ).length),
                                        project: null,
                                        role: null,
                                        role_project: null,
                                      }
                                    "
                                  >
                                    <v-icon>{{
                                      label_input.addTempItemIcon
                                    }}</v-icon>
                                  </v-btn>
                                </template>
                                <v-card light elevation="0" class="rounded-lg">
                                  <v-btn
                                    class="close-btn"
                                    icon
                                    light
                                    @click="label_input.modalAddNew = false"
                                  >
                                    <v-icon>mdi-close</v-icon>
                                  </v-btn>
                                  <!-- <v-row no-gutters justify="center"> -->
                                  <v-card-title class="headline"
                                    >Укажите данные учатника</v-card-title
                                  >

                                  <v-card-text class="mt-2 subtitle-1">
                                    После сохранения проекта будет создан новый
                                    пользователь в системе!
                                    <v-form :ref="label_input.formMember">
                                      <v-text-field
                                        clearable
                                        hide-details
                                        label="Имя"
                                        :rules="[rules.required]"
                                        v-model="dialogAddMemberData.name"
                                        placeholder=""
                                      >
                                      </v-text-field>
                                      <v-text-field
                                        clearable
                                        hide-details
                                        :rules="[rules.required]"
                                        label="Фамилия"
                                        v-model="dialogAddMemberData.sername"
                                        placeholder=""
                                      >
                                      </v-text-field>
                                      <v-text-field
                                        clearable
                                        hide-details="auto"
                                        label="Эл. почта"
                                        :rules="[
                                          rules.required,
                                          rules.emailMatch,
                                          rules.doubleLogin(
                                            label_input,
                                            dialogAddMemberData.login
                                          ),
                                        ]"
                                        v-model="dialogAddMemberData.login"
                                        placeholder=""
                                      >
                                      </v-text-field>
                                    </v-form>
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      class="new-btn"
                                      @click="addMemberLocal(label_input)"
                                      text
                                      dense
                                      color="primary"
                                    >
                                      Сохранить
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </template>
                          </v-autocomplete>
                          <v-menu
                            v-if="label_input.type === 'date'"
                            :close-on-content-click="true"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                style="font-size: 14px !important"
                                :disabled="mode !== 'edit'"
                                class="pt-0"
                                background-color="white"
                                :rules="
                                  label_input.required ? [rules.required] : []
                                "
                                v-model="label_input.model"
                                prepend-inner-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                hide-details="auto"
                                v-on="on"
                              ></v-text-field>
                            </template>

                            <v-date-picker
                              no-title
                              v-model="label_input.model"
                            ></v-date-picker>
                          </v-menu>

                          <!-- </v-row> -->
                        </v-col>
                      </v-row>
                    </v-col>
                  </div>
                  <!-- </v-col>
                  </v-row> -->
                </v-col>
              </v-row>
            </v-col>
            <!-- </v-toolbar> -->
          </v-form>
        </v-col>
      </v-row>
    </div>

    <v-dialog
      persistent
      scrollable
      max-width="400px"
      v-model="dialogErrorPermissions"
    >
      <v-card light elevation="0" class="rounded-lg">
        <!-- <v-row no-gutters justify="center"> -->
        <v-toolbar color="red" dark elevation="0">Ошибка дсотупа</v-toolbar>
        <!-- <v-card-title class="headline">Ошибка</v-card-title> -->
        <v-divider></v-divider>
        <v-card-text class="mt-3 subtitle-1">
          Данный проект для Вас не доступен!
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="new-btn"
            @click="goToLink('/')"
            text
            dense
            color="primary"
          >
            Просмотреть свои проекты
          </v-btn>
        </v-card-actions>
        <!-- </v-row> -->
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import helper from "../../plugins/helper";
import viewProkectVal from "./view_project_val";
import commonVal from "./../common_val";
import сcatalogs from "./../../plugins/catalogs";
import Helper from "./../../plugins/helper";
export default {
  data() {
    return { ...viewProkectVal, ...commonVal };
  },
  async mounted() {
    // this.formProject = this.formProject.map((m) => m);

    if (this.$route.query.id === "new") {
      this.mode = "edit";
      this.generateHierarchy();
    }
    await this.loadExtra();
    this.initFormProject();

    if (this.$route.query.id && this.$route.query.id !== "new") {
      this.currentIdProject = Number(this.$route.query.id);
      this.formProject[0].model = this.currentIdProject;
      await this.getDataProject(this.currentIdProject);
      this.mode = "view";
    }
  },
  methods: {
    ...сcatalogs,
    openModeAddit(v) {
      console.log(v);
    },
    permission() {
      if (this.$route.query.id !== "new") {
        let currentProjectEdit = this.$auth
          .user()
          .projects.find((f) => f.id === Number(this.$route.query.id));
        currentProjectEdit = currentProjectEdit
          ? currentProjectEdit.edit
          : false;
        if (this.$auth.roles() === "admin") {
          currentProjectEdit = true;
        }
        return currentProjectEdit;
      } else return false;
    },
    goToLink(link) {
      location.href = link;
    },
    addMemberLocal(label_input) {
      //Добавляем нового юзера с ролью в системе и проекте "УЧАСТНИК"
      // + проверка на существование пользователя по логину
      if (this.$refs[label_input.formMember][0].validate()) {
        label_input.errMessage = "";
        label_input.items.push(this.dialogAddMemberData);
        if (label_input.multi) label_input.model.push(this.dialogAddMemberData);
        else label_input.model = this.dialogAddMemberData;
        label_input.modalAddNew = false;
        this.changeSelect(label_input);
        // }
      }
    },
    changeSelect(v) {
      //Заполняем учтаников
      if (["userauth_1", "userauth_2", "userauth_2"].includes(v.name)) {
        const members = this.formProject.find(
          (_f) => _f.type === "label_input_block" && _f.name === "members"
        );
        const membersAll = members.data.find(
          (_ff) => _ff.name === "userauth_3"
        );
        membersAll.model = [];

        // membersAll.model = Helper.unique(
        //   members.data
        //     .filter((f) => f.roleProject === "member")
        //     .reduce((acc, el) => {
        //       return acc.concat(el.model);
        //     }, []),
        //   "id"
        // );

        console.log(
          members.data
            .filter((f) => f.roleProject === "member")
            .reduce((acc, el) => {
              return acc.concat(el.model);
            }, []),
          membersAll.model
        );
      }
    },
    initFormProject() {
      this.formProject.forEach((fec) => {
        if (fec.name === "common_date") {
          fec.data[0].model =
            this.$route.query.id === "new" ? Helper.getToday() : null;
        }
        if (fec.name === "common") {
          const idStatusProject = fec.data.find(
            (_f) => _f.name === "id_status_project"
          );
          idStatusProject.model =
            this.$route.query.id === "new"
              ? idStatusProject.items.find(
                  (_fn) => _fn.title.toLowerCase() === "планирование"
                ).id
              : null;
        }
      });
    },
    async getDataProject(v) {
      console.log(v);
      this.$route.query.id = v;

      this.currentIdProject = Number(this.$route.query.id);
      this.loadSubCatalog = true;
      console.log("OK!");
      const blockTypes = {
        objectives_0: ["Основная решаемая проблема", "Решаемая проблема"],
        objectives_1: ["Сопутствующая цель"],
        objectives_2: ["Главный критерий успеха"],
        objectives_3: ["Критерий успеха"],
        objectives_4: ["Цель"],
        objectives_5: ["Условия реализации"],
        products_0: true,
        products_1: false,
      };
      const fullDataProject = (
        await this.findCatalog("projects", {
          id: this.currentIdProject,
          title: null,
        })
      ).data.items[0];

      if (!fullDataProject) {
        this.dialogErrorPermissions = true;
      } else {
        this.formProject = this.formProject.map((m) => {
          if (m.name === "description") {
            m.model = fullDataProject[m.name];
          }
          if (m.name === "members") {
            m.data[m.data.length - 1].model = [];
            //Получаем массив всех участников проекта кроме создателя
            const membersSortFromDB = fullDataProject.members
              .filter((_fm) => _fm.project_worker)
              .sort((a, b) => a.id - b.id);
            //Присваемвам можелям соответвубщих участников проекта
            m.data = m.data.map((mMembers) => {
              //получем из списка учатников проекта того кто осотетвуюет текущему работнику над проектом
              const curIdMember =
                mMembers.project_worker === "members"
                  ? membersSortFromDB.filter(
                      (_ffmw) =>
                        _ffmw.project_worker === mMembers.project_worker
                    )
                  : membersSortFromDB.find(
                      (_ffmw) =>
                        _ffmw.project_worker === mMembers.project_worker
                    );

              //Нвхоим в списке всех пользоватлей нужного учтанкиа и присваем его модели
              let modelMember = curIdMember
                ? mMembers.project_worker === "members"
                  ? mMembers.items.filter((_finmem) =>
                      curIdMember.map((id) => id.id).includes(_finmem.id)
                    )
                  : mMembers.items.find(
                      (_finmem) => _finmem.id === curIdMember.id
                    )
                : null;

              console.log("modelMember", modelMember);
              //  console.log("membersSortFromDB", membersSortFromDB);

              //Если ти работника над проектом это все учтаники то добавляем их в массив модели
              if (mMembers.project_worker === "members") {
                modelMember = modelMember ? modelMember : [];
                mMembers.model.push(...modelMember);
              } else {
                mMembers.model = modelMember;
                //добавляем в массив модели всех учатников над проектом аналитика и разработчика
                // if (
                //   ["analyst", "developer"].includes(mMembers.project_worker)
                // ) {
                //   m.data[m.data.length - 1].model.push(modelMember);
                // }
              }
              return mMembers;
            });
          }
          if (m.name === "title" && m.type === "head_select") {
            m.text = fullDataProject[m.name];
          }
          if (["common", "common_bool", "common_date"].includes(m.name)) {
            m.data = m.data.map((mCommon) => {
              mCommon.model = fullDataProject[mCommon.name];
              return mCommon;
            });
          }

          if (m.type === "list" && m.name.startsWith("objectives")) {
            if (fullDataProject.objectives) {
              m.data = fullDataProject.objectives.filter(
                (f) =>
                  m.extra.type_objective
                    .filter((ff) => blockTypes[m.name].includes(ff.title))
                    .map((mObjectives) => mObjectives.id)
                    .includes(f.id_type_objective) &&
                  // не выводим в цели из архива
                  f.id_status_objective !==
                    m.extra.statuses_objectives.find(
                      (_f) => _f.title.toLowerCase() === "архив"
                    ).id
              );
              // проставляем родителей
              m.data = m.data.map((mObjectives) => {
                if (
                  mObjectives.id_parent_objective ||
                  mObjectives.id_parent_objective === 0
                ) {
                  mObjectives.parent = m.data.findIndex(
                    (fi) => fi.id === mObjectives.id_parent_objective
                  );
                }

                return mObjectives;
              });
            } else {
              m.data = [];
            }
          }
          if (m.type === "list" && m.name.startsWith("products")) {
            if (fullDataProject.products) {
              m.data = fullDataProject.products.filter(
                (f) =>
                  f.main === blockTypes[m.name] &&
                  // не выводим в продукты из архива
                  f.id_status_product !==
                    m.extra.statuses_products.find(
                      (_f) => _f.title.toLowerCase() === "архив"
                    ).id
              );

              // проставляем родителей
              m.data = m.data.map((mProducts) => {
                if (
                  mProducts.id_parent_product ||
                  mProducts.id_parent_product === 0
                ) {
                  mProducts.parent = m.data.findIndex(
                    (fi) => fi.id === mProducts.id_parent_product
                  );
                }

                return mProducts;
              });
            } else {
              m.data = [];
            }
          }

          return m;
        });
        console.log(fullDataProject);
        this.generateHierarchy();
      }
      this.loadSubCatalog = false;
    },
    async loadExtra() {
      this.loadSubCatalog = true;
      await this.getSubCatalog("roles_project");
      await this.getSubCatalog("userauth");
      await this.getSubCatalog("id_status_project");
      await this.getSubCatalog("type_objective");
      await this.getSubCatalog("statuses_objectives");
      await this.getSubCatalog("statuses_products");
      await this.getSubCatalog("projects");
      this.loadSubCatalog = false;
    },
    async getSubCatalog(name) {
      this.itemsSub = (
        await this.getCatalog(this.prepareSubCatalogsNAme(name))
      ).data.items;
      this.formProject.forEach((catalog) => {
        if (catalog.type === "label_input_block") {
          catalog.data.forEach((selects) => {
            //Если каталог - пользователи, то сплитуем название каталога
            if (catalog.name === "members") {
              console.log(selects.name);
              if (selects.name.split("_")[0] === name) {
                selects.items = this.itemsSub;
              }
              catalog.extra[name] = this.itemsSub;
              // иначе сравниваем полное имя
            } else {
              if (selects.name === name) {
                selects.items = this.itemsSub;
              }
            }
          });
        }
        if (catalog.type === "list") {
          catalog.extra[name] = this.itemsSub;
        }
        if (catalog.type === "head_select") {
          console.log("this.allProjects", this.itemsSub);
          this.allProjects = this.itemsSub;
        }
      });
      return this.itemsSub;
    },
    async saveEditProject() {
      if (this.$refs.formProjectData.validate()) {
        //Подготовка формы проекта для создания
        const prepareFormProject = this.formProject
          .reduce((acc, el) => {
            const d = acc.concat(
              el.name === "common" ||
                el.name === "common_bool" ||
                el.name === "common_date"
                ? el.data
                : el
            );
            return d;
          }, [])
          .reduce((acc, el) => {
            let data = el.model;
            let key = el.name;
            if (el.name === "members") {
              data = el.data.reduce((acc1, el1) => {
                const d = el1.model;
                console.log(d);
                let memb =
                  !Array.isArray(d) && d
                    ? {
                        roleProject: el1.roleProject,
                        project_worker: el1.project_worker,
                        id_user: d.id,
                        id_project: this.currentIdProject,
                        id_role_project: el.extra.roles_project.find(
                          (_fr) => _fr.name === el1.roleProject
                        ).id,
                        ...d,
                      }
                    : d &&
                      d
                        .filter((f) => f)
                        .map((_sm) => {
                          console.log(_sm);
                          return {
                            roleProject: el1.roleProject,
                            project_worker: el1.project_worker,
                            id_user: _sm.id,
                            id_project: this.currentIdProject,
                            id_role_project: el.extra.roles_project.find(
                              (_fr) => _fr.name === el1.roleProject
                            ).id,
                            ..._sm,
                          };
                        });
                return acc1.concat(memb);
              }, []);
              //   console.log(data);
              //делаем учатсников уникальными заисклчением руковоителя поекта
              data = data
                .filter(
                  (_fpm) => _fpm && _fpm.roleProject === "project_manager"
                )
                .concat(
                  Helper.unique(
                    data.filter(
                      (_fpm) => _fpm && _fpm.roleProject !== "project_manager"
                    ),
                    "id_user"
                  )
                );
            }
            if (
              el.name === "title" &&
              el.type === "head_select" &&
              this.$route.query.id &&
              typeof this.$route.query.id === "number"
            ) {
              data = el.text; //this.allProjects.find((fff) => fff.id === el.model).title;
            }
            if (
              (el.name.startsWith("objectives") ||
                el.name.startsWith("products")) &&
              el.type === "list"
            ) {
              data = el.data;
            }
            return {
              ...acc,
              ...{
                [key]: data,
              },
            };
          }, {});
        console.log(prepareFormProject);
        this.loadSubCatalog = true;
        //Присваиваем id создателя проекта
        prepareFormProject.creator = this.$auth.user();

        //Создаем или обвноляем проект
        if (this.$route.query.id === "new") {
          const newProjectId = (
            await this.addToCatalog("projects", prepareFormProject)
          ).data;
          location.href = "/view/project?id=" + newProjectId;
        } else {
          await this.updateToCatalog(
            "projects",
            prepareFormProject,
            this.currentIdProject
          );
          location.href = "/view/project?id=" + this.currentIdProject;
        }
        this.loadSubCatalog = false;
        this.mode = "view";
      }
    },
    cancelEditProject() {
      if (this.$route.query.id !== "new") this.mode = "view";
      //удаляем локально созданние списки
      // this.formProject.forEach((el) => {
      //   if (el.type === "list") {
      //     el.data = el.data.filter((f) => f.id);
      //     el.data = el.data.map((m) => {
      //       return { ...m, remove: undefined, parent: undefined };
      //     });
      //   }
      // });

      this.generateHierarchy();
    },
    //добавление сущности - локально
    addEntityLocal(currentNode) {
      currentNode.data.push({
        ref: "newEntityLoad",
        title: "",
        description: "",
        priority: 1,
        // accom: 1,
        id_project: null,
      });
      setTimeout(() => {
        this.$vuetify.goTo(this.$refs.newEntityLoad[0], this.optionGoTo);
        this.initRef();
        this.generateHierarchy();
      }, 100);
    },
    initRef() {
      this.formProject.forEach((el) => {
        if (el.type === "list") {
          el.ref = undefined;
          el.data = el.data.map((m) => {
            return {
              ...m,
              ref: undefined,
            };
          });
        }
      });
    },

    //удаление сущности - локально
    removeEntityLocal(unitForm, item) {
      console.log("remove-IN", item);
      item.remove = true;
      item.parent = undefined;
      unitForm.ref = "removeBlockEntity";
      unitForm.data = unitForm.data.map((m) => {
        return { ...m, parent: m.parent === item.index ? undefined : m.parent };
      });
      //переход на начало раздела
      setTimeout(() => {
        this.$vuetify.goTo(this.$refs.removeBlockEntity[0], this.optionGoTo);
        this.initRef();
        this.generateHierarchy();
      }, 100);
    },
    generateHierarchy() {
      for (let i = 0; i < this.formProject.length; i++) {
        const currentRaw = this.formProject[i];
        console.log(currentRaw.type);
        let indexNew = -1;
        let indexFirst = -1;
        if (currentRaw.type === "list") {
          for (let y = 0; y < currentRaw.data.length; y++) {
            let currentListRaw = currentRaw.data[y];
            if (
              !currentListRaw.remove /*&& y !== 0*/ &&
              !currentListRaw.parent &&
              currentListRaw.parent !== 0
            )
              indexNew++;
            if (!currentListRaw.remove) indexFirst++;
            let parentRaw = currentRaw.data.find(
              (f) => currentListRaw.parent === f.index
            );
            const parentHierarchy = parentRaw ? parentRaw.hierarchy : null;
            const parentGroup = helper.groupBy(
              currentRaw.data.filter((f) => f.parent || f.parent === 0),
              (el) => [el.parent]
            );
            currentListRaw.index = y;
            currentListRaw.hierarchy =
              !currentListRaw.parent && currentListRaw.parent !== 0
                ? `${currentRaw.hierarchy}.${
                    indexNew + currentRaw.start_sub_hierarchy
                  }`
                : `${parentHierarchy}.${
                    1 +
                    parentGroup
                      .find((f) => f[0].parent === currentListRaw.parent)
                      .findIndex((el) => el.index === currentListRaw.index)
                  }`;
            ///Основная решаемая проблема и решаемые проблемы
            if (currentRaw.name === "objectives_0") {
              currentListRaw.id_status_objective =
                currentRaw.extra.statuses_objectives.find(
                  (f) => f.title === "активный"
                );
              console.log(
                currentRaw.name,
                indexFirst,
                currentRaw.start_sub_hierarchy,
                currentListRaw.hierarchy
              );
              if (indexFirst + currentRaw.start_sub_hierarchy === 0) {
                currentListRaw.id_type_objective =
                  currentRaw.extra.type_objective.find(
                    (f) => f.title === "Основная решаемая проблема"
                  );
              } else {
                currentListRaw.id_type_objective =
                  currentRaw.extra.type_objective.find(
                    (f) => f.title === "Решаемая проблема"
                  );
              }
            }
            ///Сопутствующие цели
            if (currentRaw.name === "objectives_1") {
              currentListRaw.id_type_objective =
                currentRaw.extra.type_objective.find(
                  (f) => f.title === "Сопутствующая цель"
                );

              currentListRaw.id_status_objective =
                currentRaw.extra.statuses_objectives.find(
                  (f) => f.title === "активный"
                );
            }
            ///Главные продукты
            if (currentRaw.name === "products_0") {
              currentListRaw.main = true;

              if (this.$route.query.id === "new")
                currentListRaw.date_create = Helper.getToday();

              currentListRaw.id_status_product =
                currentRaw.extra.statuses_products.find(
                  (f) => f.title === "активный"
                );
            }
            ///продукты
            if (currentRaw.name === "products_1") {
              if (this.$route.query.id === "new")
                currentListRaw.date_create = Helper.getToday();

              currentListRaw.id_status_product =
                currentRaw.extra.statuses_products.find(
                  (f) => f.title === "активный"
                );
            }

            ///Главный критерий успеха.
            if (currentRaw.name === "objectives_2") {
              currentListRaw.id_type_objective =
                currentRaw.extra.type_objective.find(
                  (f) => f.title === "Главный критерий успеха"
                );

              currentListRaw.id_status_objective =
                currentRaw.extra.statuses_objectives.find(
                  (f) => f.title === "активный"
                );
            }

            ///Вторичные критерии успеха
            if (currentRaw.name === "objectives_3") {
              currentListRaw.id_type_objective =
                currentRaw.extra.type_objective.find(
                  (f) => f.title === "Критерий успеха"
                );

              currentListRaw.id_status_objective =
                currentRaw.extra.statuses_objectives.find(
                  (f) => f.title === "активный"
                );
            }

            ///Критерий завершения проекта
            if (currentRaw.name === "objectives_4") {
              currentListRaw.id_type_objective =
                currentRaw.extra.type_objective.find((f) => f.title === "Цель");

              currentListRaw.id_status_objective =
                currentRaw.extra.statuses_objectives.find(
                  (f) => f.title === "активный"
                );
            }

            //Условия реализации проекта
            if (currentRaw.name === "objectives_5") {
              currentListRaw.id_type_objective =
                currentRaw.extra.type_objective.find(
                  (f) => f.title === "Условия реализации"
                );

              currentListRaw.id_status_objective =
                currentRaw.extra.statuses_objectives.find(
                  (f) => f.title === "активный"
                );
            }
          }
        }
      }
      this.formProject = this.formProject.map((m) => m);
      console.log(this.formProject);
    },
  },
  watch: {
    testVar(v) {
      console.log(v);
    },
    // formProject: {
    //   handler() {
    //     this.prepareFormProject();
    //   },
    //   deep: true,
    // },
  },
};
</script>

<style scoped>
::v-deep .v-label {
  font-size: 14px;
  line-height: 1;
  min-height: 8px;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.sticky_head {
  position: sticky;
  top: 64px;
  z-index: 1;
  background: white;
  box-shadow: 0 3px 5px -5px #333;
}

::v-deep .head_big_font {
  font-size: 22px;
  font-weight: 700;
  color: #000 !important;
}

.control_button {
  position: absolute;
  top: -15px;
}
.item_raw:hover .control_button_remove {
  opacity: 1;
  transform: translateX(0);
}

.control_button_remove {
  transition: all 0.3s ease;
  transform: translateX(10px);
  opacity: 0;
  position: absolute;
  top: 10;
  left: 0;
}

.item_raw_member:hover .control_button_add_member {
  opacity: 1;
  transform: translateY(0);
}

.control_button_add_member {
  transition: all 0.3s ease;
  transform: translateY(30px);
  opacity: 0;
  position: absolute;
  top: -30px;
  left: -25px;
}

::v-deep .v-input--is-disabled input {
  color: rgba(0, 0, 0, 0.7) !important;
}

::v-deep .v-input--is-disabled textarea {
  color: rgba(0, 0, 0, 0.6) !important;
}

::v-deep .v-application .error--text {
  color: #ff5252 !important;
  caret-color: #ff5252 !important;
}
.addnal-button {
  position: absolute;
  right: 0;
  top: 15px;
}

::v-deep .v-expansion-panels {
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  width: 100%;
  z-index: 0;
}
</style>