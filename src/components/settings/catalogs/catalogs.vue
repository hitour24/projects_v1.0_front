<template>
  <div>
    <div class="ma-3">
      <h1>Справочники</h1>
      <v-row no-gutters>
        <v-col sm="auto" style="min-width: 250px" class="pl-0">
          <v-row
            style="touch-action: none !important"
            align="center"
            class="pt-2"
            no-gutters
            justify="start"
          >
            <v-col cols="auto">
              <v-list>
                <v-list-item-group
                  mandatory
                  color="primary"
                  v-model="sectionMoreCatalog"
                >
                  <v-list-item
                    v-for="catalog in dataTable"
                    :key="catalog.name"
                    :value="catalog"
                  >
                    <v-list-item-icon>
                      <v-icon>{{ catalog.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="text-xs">
                        {{ catalog.title }}</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
          </v-row>
        </v-col>
        <v-col style="min-width: 300px" sm class="pa-4">
          <v-skeleton-loader
            min-width="300"
            v-if="loadCatalog"
            type="table-heading, list-item-three-line"
          ></v-skeleton-loader>
          <v-row no-gutters>
            <div class="w-100" v-if="selectMoreCatalog.table">
              <TableUnit
                :actionsButtons="true"
                :infoReport="infoReport"
                :loadAddRaw="loadAddRaw"
                :loading="loading"
                :itemClasses="itemClasses"
                :dataTable="selectMoreCatalog"
                :dialogAddItem="dialogAddItem"
                :dialogRemove="dialogRemove"
                :loadSubCatalog="loadSubCatalog"
                :resetFormAddEdit="resetFormAddEdit"
                :initRemoveRaw="removeRaw"
                :editRaw="editRaw"
                @openEditDialog="openEditDialog"
                @openAddDialog="openAddDialog"
                @getSubCatalog="getSubCatalog"
                @edit="edit"
                @add="add"
                @find="find"
                @remove="remove"
                @closwDialogAddItem="closwDialogAddItem"
                @closeDialogRemove="closeDialogRemove"
                @openDialogRemove="openDialogRemove"
              />
            </div>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import catalogValue from "./params";
import commonVal from "./../../common_val";
import catalogs from "./../../../plugins/catalogs";
import TableUnit from "./../../units/table/table.vue";
export default {
  components: {
    TableUnit,
  },
  data() {
    return {
      ...catalogValue,
      ...commonVal,
    };
  },
  methods: {
    ...catalogs,
    async remove(removeRaw) {
      this.loadAddRaw = true;
      await this.removeFromCatalog(removeRaw.name_catalog, removeRaw.id);
      await this.get();
      this.loadAddRaw = false;
      this.dialogRemove = false;
      this.removeRaw = !this.removeRaw;
      // deleteItem()
    },
    async edit(name, data) {
      console.log(data);
      data = data.reduce((acc, el) => {
        return {
          ...acc,
          ...{
            [el.name]:
              el.name === "coins" && el.multi
                ? el.model.map((m) => m.name).join(",")
                : el.model,
          },
        };
      }, {});
      const id = this.editRaw.id;
      this.loadAddRaw = true;
      await this.updateToCatalog(name, data, id);
      await this.get();
      this.loadAddRaw = false;
      this.dialogAddItem = false;
      this.resetFormAddEdit = !this.resetFormAddEdit;
      this.editRaw = null;
    },

    async add(name, data) {
      data = data.reduce((acc, el) => {
        return {
          ...acc,
          ...{
            [el.name]: el.multi
              ? el.model.map((m) => m.name).join(",")
              : el.model,
          },
        };
      }, {});
      this.loadAddRaw = true;
      await this.addToCatalog(name, data);
      await this.get();
      this.loadAddRaw = false;
      this.dialogAddItem = false;
      this.resetFormAddEdit = !this.resetFormAddEdit;
    },
    async find() {
      let v = this.sectionMoreCatalog;
      console.log(v);
      // this.selectMoreCatalog = {};
      const name = this.prepareSubCatalogsNAme(v.name);
      const data = this.selectMoreCatalog.add.data
        .filter((f) => f.filter)
        .reduce((acc, el) => {
          return {
            ...acc,
            ...{
              [el.name]:
                el.multi && el.model
                  ? el.model.map((m) => m.name).join(",")
                  : el.model,
            },
          };
        }, {});

      this.loadingFind = true;
      const dataFind = (await this.findCatalog(name, data)).data;
      v.table = dataFind.items;
      this.infoReport.amount = dataFind.info.countRows;
      this.loadingFind = false;
      v.headers = v.table.length
        ? Object.keys(v.table[0])
            .map((m) => {
              return {
                text: m,
                align: "start",
                sortable: true,
                value: m,
                class: ["nowrap", "grey lighten-5"],
              };
            })
            .concat([
              {
                text: "actions",
                align: "start",
                sortable: false,
                value: "actions",
                class: ["nowrap", "grey lighten-5"],
              },
            ])
        : [];
      console.log(v);
      this.selectMoreCatalog = v;
    },
    async getSubCatalog(name) {
      this.loadSubCatalog = true;
      console.log(name);
      this.itemsSub = (
        await this.getCatalog(this.prepareSubCatalogsNAme(name))
      ).data.items;
      this.dataTable.forEach((catalog) => {
        if (catalog.add)
          catalog.add.data.forEach((selects) => {
            if (selects.name === name) {
              selects.items = this.itemsSub;
              // if (selects.multi)
              // selects.model = this.itemsSub.filter((f) =>
              //   selects.model.split(",").includes(f.name)
              // );
              // console.log(nameSelect, this.catalogs);
            }
          });
      });
      this.loadSubCatalog = false;

      return this.itemsSub;
    },
    /**
     * Инициализация добавления
     */
    async openAddDialog(data) {
      this.dialogAddItem = true;
      this.loadSubCatalog = true;
      data.add.data = await Promise.all(
        data.add.data.map(async (m) => {
          if (m.type === "select") {
            await this.getSubCatalog(m.name);
          }
          return {
            ...m,
          };
        })
      );

      this.loadSubCatalog = false;
    },
    /**
     * Инициализация редактирвоания
     */
    async openEditDialog(item, selectMoreCatalog) {
      this.dialogAddItem = true;
      item["name_catalog"] = selectMoreCatalog.name;
      this.editRaw = item;
      this.loadSubCatalog = true;
      selectMoreCatalog.add.data = await Promise.all(
        selectMoreCatalog.add.data.map(async (m) => {
          let model = item[this.prepareSubCatalogsNAme(m.name)];

          if (m.type === "select") {
            await this.getSubCatalog(m.name);

            const multiModel = () => {
              return m.items.filter((f) => model.split(",").includes(f.name));
            };

            const sibleModel = () => {
              return m.items.find((f) => {
                let fullNameItem = f.name;

                // if (m.name === "id_place")
                //   fullNameItem = `${f.name} - ${f.region}`;
                // if (m.name === "id_group")
                //   fullNameItem = `${f.name} ${f.performance}`;
                // if (m.name === "id_client")
                //   fullNameItem = `${f.name} - ${f.master_client}`;
                // if (m.name === "id_source")
                //   fullNameItem = `${f.pool} (${f.client}) - ${f.coins}`;

                console.log(model, fullNameItem);
                return model === fullNameItem;
              });
            };
            model = m.multi
              ? multiModel()
              : sibleModel()
              ? sibleModel().id
              : model;
          }

          return {
            ...m,
            model: model,
          };
        })
      );
      this.loadSubCatalog = false;
    },
    async get() {
      let v = this.sectionMoreCatalog;
      v.add.data = v.add.data.map((m) => {
        return { ...m, model: null };
      });
      this.selectMoreCatalog = {};
      this.loadCatalog = true;
      const dataList = (await this.getCatalog(v.name)).data;
      v.table = dataList.items;
      this.infoReport.amount = dataList.info.countRows;
      console.log(v.table);
      this.loadCatalog = false;
      v.headers = v.table.length
        ? Object.keys(v.table[0])
            .map((m) => {
              return {
                text: m,
                align: "start",
                sortable: true,
                value: m,
                // groupable: m === 'master_client' ? true : false,
                class: ["nowrap", "grey lighten-5"],
              };
            })
            .concat([
              {
                text: "actions",
                align: "start",
                sortable: false,
                value: "actions",
                class: ["nowrap", "grey lighten-5"],
              },
            ])
        : [];
      console.log(v);
      this.selectMoreCatalog = v;
    },
  },
  watch: {
    async sectionMoreCatalog() {
      await this.get();
    },
  },
};
</script>