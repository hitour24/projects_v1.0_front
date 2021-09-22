<template>
  <div>
    <v-data-table
      v-model="multiSelected"
      :show-group-by="showGroup"
      :loading="loading"
      :item-class="itemClasses"
      no-data-text="Данные не найдены"
      mobile-breakpoint="900"
      :headers="dataTable.headers"
      @click:row="handleClickRow"
      :items="dataTable.table"
      :items-per-page="50"
      class="elevation-0"
      item-key="id"
      :show-select="dataTable.multi"
      :show-expand="expandable ? true : false"
    >
      <template v-slot:[`item.title`]="{ item }">
        <div class="more_text">
          <read-more
            v-if="item.title"
            :maxChars="50"
            more-str="Читать"
            less-str="Скрыть"
            :text="item.title"
            link="javascript:return false;"
          ></read-more>
        </div>
      </template>
      <template v-slot:[`item.description`]="{ item }">
        <div class="more_text">
          <read-more
            v-if="item.description"
            :maxChars="50"
            more-str="Читать"
            less-str="Скрыть"
            :text="item.description"
            link="javascript:return false;"
          ></read-more>
        </div>
      </template>
      <template v-slot:[`item.project`]="{ item }">
        <div class="more_text">
          <read-more
            v-if="item.project"
            :maxChars="50"
            more-str="Читать"
            less-str="Скрыть"
            :text="item.project"
            link="javascript:return false;"
          ></read-more>
        </div>
      </template>
      <template v-slot:[`item.parent`]="{ item }">
        <div class="more_text">
          <read-more
            v-if="item.parent"
            :maxChars="50"
            more-str="Читать"
            less-str="Скрыть"
            :text="item.parent"
            link="javascript:return false;"
          ></read-more>
        </div>
      </template>

      <template v-if="chips" v-slot:[chips.slot]="{ item }">
        <v-chip
          v-for="(chip, ind) in item[chips.field].filter(chips.filter)"
          :key="ind"
          class="ma-1"
          :color="chips.color(chip)"
          dark
        >
          {{ chip[chips.title] === null ? chips.ifnull : chip[chips.title] }}
        </v-chip>
      </template>

      <template v-if="expandable" v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-data-table
            v-if="item[expandable.field].length"
            hide-default-footer
            :headers="
              Object.keys(item[expandable.field][0])
                .filter(expandable.filterFields)
                .map((m) => {
                  return {
                    text: m,
                    align: 'start',
                    sortable: true,
                    value: m,
                    class: ['nowrap', 'grey lighten-5'],
                  };
                })
            "
            :items="item[expandable.field]"
          >
            <template
              v-if="boolsCheckIcon"
              v-slot:[boolsCheckIcon.slot]="{ item }"
            >
              <v-icon
                v-if="item[boolsCheckIcon.field]"
                :color="boolsCheckIcon.color"
                >{{ boolsCheckIcon.icon }}</v-icon
              >
              <span v-else> - </span>
            </template>
          </v-data-table>
        </td>
      </template>

      <template v-if="actionsButtons" v-slot:[`item.actions`]="{ item }">
        <v-icon
          :disabled="item.default"
          small
          class="mr-2"
          @click="openEditDialog(item, dataTable)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          :disabled="item.default"
          @click="
            () => {
              item['name_catalog'] = dataTable.name;
              removeRaw = item;
              $emit('openDialogRemove', true);
            }
          "
        >
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title
            >{{ dataTable.title }}
            <v-btn
              v-if="dataTable.tooltip"
              icon
              small
              @click="
                dialogHelpTooltip = true;
                helpTooltip = dataTable.tooltip;
              "
            >
              <v-icon size="20">{{ dataTable.tooltipIcon }} </v-icon>
            </v-btn>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn
            @click="openAddDialog(dataTable)"
            class="new-btn"
            elevation="0"
            color="success"
            >Добавить</v-btn
          >

          <v-dialog
            persistent
            v-if="dataTable.add"
            v-model="dialogAddItem"
            max-width="650px"
          >
            <v-card>
              <v-overlay
                opacity="0.8"
                z-index="12"
                absolute
                :value="loadSubCatalog"
              >
                <v-row no-gutters justify="center">
                  <v-progress-circular
                    indeterminate
                    size="64"
                  ></v-progress-circular>
                </v-row>
                <v-row class="mt-3" no-gutters justify="center">
                  <span class="subhead">Идет загрузка данных...</span>
                </v-row>
              </v-overlay>
              <v-card-title>
                <span class="text-h5">{{
                  editRaw ? dataTable.add.titleEdit : dataTable.add.title
                }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form ref="formAddRawCatalog">
                    <v-row>
                      <v-col
                        cols="12"
                        :sm="editFiled.block ? 12 : 6"
                        v-for="editFiled in dataTable.add.data.filter(
                          (f) => !f.hiddenDiaog
                        )"
                        :key="editFiled.name"
                      >
                        <v-textarea
                          :rules="editFiled.required ? [rules.required] : []"
                          auto-grow
                          rows="1"
                          v-if="editFiled.type === 'textarea'"
                          :label="editFiled.title"
                          v-model="editFiled.model"
                        >
                        </v-textarea>
                        <v-text-field
                          v-if="editFiled.type === 'text'"
                          :append-outer-icon="
                            editFiled.tooltipIcon && !editRaw
                              ? editFiled.tooltipIcon
                              : ''
                          "
                          @click:append-outer="
                            dialogHelpTooltip = true;
                            helpTooltip = editFiled.tooltip;
                          "
                          :rules="editFiled.required ? [rules.required] : []"
                          v-model="editFiled.model"
                          :placeholder="editFiled.placeholder"
                          :label="editFiled.title"
                        ></v-text-field>

                        <v-menu
                          v-if="editFiled.type === 'date'"
                          :close-on-content-click="true"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              :rules="
                                editFiled.required ? [rules.required] : []
                              "
                              v-model="editFiled.model"
                              :label="editFiled.title"
                              prepend-icon="mdi-calendar"
                              :placeholder="editFiled.placeholder"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              :disabled="
                                editFiled.enabled
                                  ? !dataTable.add.data.find(
                                      (f) => editFiled.enabled === f.name
                                    ).model
                                  : false
                              "
                            ></v-text-field>
                          </template>

                          <v-date-picker
                            no-title
                            v-model="editFiled.model"
                          ></v-date-picker>
                        </v-menu>
                        <v-autocomplete
                          v-if="editFiled.type === 'select'"
                          :append-outer-icon="
                            editFiled.tooltipIcon && !editRaw
                              ? editFiled.tooltipIcon
                              : ''
                          "
                          @click:append-outer="
                            dialogHelpTooltip = true;
                            helpTooltip = editFiled.tooltip;
                          "
                          :disabled="editFiled.disabled"
                          :multiple="editFiled.multi"
                          :rules="editFiled.required ? [rules.required] : []"
                          :loading="loadSubCatalog"
                          :items="editFiled.items ? editFiled.items : []"
                          @focus="focusSubSelect(editFiled)"
                          @change="
                            (e) => {
                              editFiled.model = e ? e.id : null;
                              if (editFiled.multi) {
                                editFiled.model = e;
                              }
                              changeSubSelect(editFiled);
                            }
                          "
                          v-model="editFiled.model"
                          :item-text="
                            [
                              'id_place',
                              'id_group',
                              'id_client',
                              'id_source',
                            ].includes(editFiled.name)
                              ? (e) => {
                                  if (editFiled.name === 'id_place')
                                    return `${e.name} - ${e.region}`;
                                  if (editFiled.name === 'id_group')
                                    return `${e.name} ${e.performance}`;
                                  if (editFiled.name === 'id_client')
                                    return `${e.name} - ${e.master_client}`;
                                  if (editFiled.name === 'id_source')
                                    return `${e.pool} (${e.client}) - ${e.coins}`;
                                }
                              : editFiled.itemText
                          "
                          item-value="id"
                          return-object
                          :label="editFiled.title"
                        >
                          <template v-slot:prepend>
                            <v-icon
                              @click="
                                dialogAddTempItem = true;
                                addTempData = editFiled.addTempData;
                              "
                              color="success"
                              >{{
                                editFiled.addTempItemIcon && !editRaw
                                  ? editFiled.addTempItemIcon
                                  : ""
                              }}</v-icon
                            >
                          </template>
                        </v-autocomplete>
                        <v-checkbox
                          @click="focusSubSelect(editFiled)"
                          hide-details
                          v-if="editFiled.type === 'checkbox'"
                          v-model="editFiled.model"
                          :label="editFiled.title"
                        ></v-checkbox>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  class="new-btn"
                  color="blue darken-1"
                  text
                  :disabled="loadAddRaw"
                  @click="
                    () => {
                      $emit('closwDialogAddItem', false);
                      dataTable.add.data.forEach((el) => {
                        el.model = null;
                      });
                      itemsSub = [];
                      $refs.formAddRawCatalog.reset();
                    }
                  "
                >
                  Отменить
                </v-btn>

                <v-btn
                  class="new-btn"
                  color="blue darken-1"
                  text
                  :loading="loadAddRaw"
                  :disabled="loadAddRaw"
                  @click="
                    () => {
                      if (editRaw) edit(dataTable.name, dataTable.add.data);
                      else add(dataTable.name, dataTable.add.data);
                    }
                  "
                >
                  {{ editRaw ? "Обновить" : "Добавить" }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>

        <v-row no-gutters class="grey lighten-5">
          <SearchBlock
            :loadDataFilter="loadSubCatalog"
            :filter="dataTable.add.data"
            @find="find()"
            @getCatalogFromBlock="getSubCatalog"
          />
        </v-row>
        <v-divider> </v-divider>

        <v-row class="ma-0" align="center">
          <v-col v-if="dataTable.multi" cols="auto">
            <!-- <v-btn icon> -->
            <v-icon
              :disabled="!multiSelected.filter((f) => !f.default).length"
              color="red lighten-3"
              @click="
                removeRaw = {
                  name_catalog: dataTable.name,
                  id: multiSelected.map((m) => m.id),
                };

                $emit('openDialogRemove', true);
              "
            >
              mdi-delete
            </v-icon>
            <!-- </v-btn> -->
          </v-col>
          <v-col cols="auto">
            Всего записей - <b>{{ infoReport.amount }}</b></v-col
          >
          <v-spacer></v-spacer>
          <v-col cols="auto" sm v-if="helpbox && helpbox.length">
            <v-row no-gutters align="center" justify="end">
              <v-col cols="auto" v-for="help in helpbox" :key="help.title">
                <!-- <v-row no-gutters align="center"> -->
                <v-col cols="auto">
                  <v-row no-gutters align="center">
                    <v-sheet
                      height="15"
                      width="15"
                      :color="help.color"
                    ></v-sheet>
                    <v-col cols="auto" class="ml-2"> — {{ help.title }} </v-col>
                  </v-row>
                </v-col>
                <!-- </v-row> -->
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider> </v-divider>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogHelpTooltip" max-width="290">
      <v-card>
        <v-card-title class="text-h5"> Помощь </v-card-title>

        <v-card-text>
          <span v-html="helpTooltip"></span>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            class="new-btn"
            color="green darken-1"
            text
            @click="dialogHelpTooltip = false"
          >
            Понятно
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog persistent v-model="dialogRemove" max-width="500px">
      <v-card>
        <v-card-title class="text-h6"
          >Вы уверены что хотите удалить эту строку?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="new-btn"
            color="blue darken-1"
            text
            :disabled="loadAddRaw"
            @click="$emit('closeDialogRemove', false)"
            >Нет</v-btn
          >
          <v-btn
            class="new-btn"
            color="blue darken-1"
            text
            :loading="loadAddRaw"
            :disabled="loadAddRaw"
            @click="remove"
            >Да</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import commonVal from "./../../common_val";
import tableVal from "./table_val";
import SearchBlock from "../../units/search/search.vue";
export default {
  components: {
    SearchBlock,
  },
  props: [
    "showGroup",
    "infoReport",
    "loadAddRaw",
    "loading",
    "itemClasses",
    "dataTable",
    "dialogAddItem",
    "dialogRemove",
    "loadSubCatalog",
    "resetFormAddEdit",
    "initRemoveRaw",
    "editRaw",
    "linkAdd",
    "actionsButtons",
    "helpbox",
    "chips",
    "expandable",
    "boolsCheckIcon",
  ],
  data() {
    return {
      rules: commonVal.rules,
      dialogHelpTooltip: commonVal.dialogHelpTooltip,
      helpTooltip: commonVal.helpTooltip,
      tempSubItems: commonVal.tempSubItems,
      isHidden: false,
      ...tableVal,
    };
  },
  watch: {
    resetFormAddEdit() {
      this.$refs.formAddRawCatalog.reset();
    },
    initRemoveRaw() {
      this.removeRaw = null;
    },
  },
  // created() {
  //   document.getElementById("show_more").addEventListener("click", () => {
  //     this.isHidden = !this.isHidden;
  //     computeState();
  //   });
  // },
  methods: {
    showMOre(v) {
      console.log(v);
    },
    // computeState() {
    //   if (this.isHidden) {
    //     desc.innerHTML =
    //       text.split("", 240).join("").toLowerCase().padEnd(243, ".") +
    //       "<span id='show_more'>Показать весь</span>";
    //   } else {
    //     desc.innerHTML = text + "<span id='show_more'>Показать меньше</span>";
    //   }
    // },
    remove() {
      this.$emit("remove", this.removeRaw);
    },
    openEditDialog(item, data) {
      this.$emit("openEditDialog", item, data);
    },
    openAddDialog(data) {
      if (this.linkAdd) {
        window.open(this.linkAdd);
      } else this.$emit("openAddDialog", data);
    },
    getSubCatalog(name) {
      this.$emit("getSubCatalog", name);
    },
    edit(name, addData) {
      if (this.$refs.formAddRawCatalog.validate()) {
        this.$emit("edit", name, addData);
      }
    },
    add(name, addData) {
      if (this.$refs.formAddRawCatalog.validate()) {
        this.$emit("add", name, addData);
      }
    },
    find() {
      this.$emit("find", true);
    },
    handleClickRow(v) {
      this.$emit("handleClickRow", v);
    },
    focusSubSelect(v) {
      this.$emit("focusSubSelect", v);
    },
    changeSubSelect(v) {
      this.$emit("changeSubSelect", v);
    },
  },
};
</script>

<style scoped>
.trunscate_vertikal {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  /* width: 100%;
  line-height: 1.2em;
  height: 3.6em;
  background-color: #363636;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; */
}
/* .trunscate_vertikal::after {
  content: "Показать больше";
  color: "blue";
  position: relative;
} */
::v-deep .more_text p {
  margin: 0;
}

::v-deep .more_text span a {
  text-decoration: none !important;
}
</style>

