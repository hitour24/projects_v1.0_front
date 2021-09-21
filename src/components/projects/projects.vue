<template>
  <div>
    <div class="ma-3">
      <h1>Проекты</h1>
      <v-row no-gutters>
        <v-col class="w-100">
          <TableUnit
            :infoReport="infoReport"
            :loadAddRaw="loadAddRaw"
            :loading="loading"
            :itemClasses="itemClasses"
            :dataTable="dataTable[0]"
            :dialogAddItem="dialogAddItem"
            :dialogRemove="dialogRemove"
            :loadSubCatalog="loadSubCatalog"
            :initRemoveRaw="removeRaw"
            :editRaw="editRaw"
            :helpbox="[{ color: 'red lighten-4', title: 'в архиве' }]"
            :chips="{
              field: 'members',
              slot: `item.members`,
              filter: (f) => f.id === this.$auth.user().id,
              color: (v) => colorRoles[v.role_project_name],
              title: 'role_project',
            }"
            :linkAdd="linkAdd"
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
            @handleClickRow="handleClickRow"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import TableUnit from "../units/table/table.vue";
import projectsVal from "./projects_val";
import commonVal from "./../common_val";
import catalogs from "./../../plugins/catalogs";
export default {
  components: {
    TableUnit,
  },
  data() {
    return {
      ...projectsVal,
      ...commonVal,
      linkAdd: "/view/project?id=new",
    };
  },
  async mounted() {
    await this.find();
  },
  methods: {
    ...catalogs,
    async remove(v) {
      console.log(v);
      this.removeRaw = v;
      this.loadAddRaw = true;
      await this.removeFromCatalog(
        this.removeRaw.name_catalog,
        this.removeRaw.id
      );
      await this.find();
      this.loadAddRaw = false;
      this.dialogRemove = false;
      this.removeRaw = !this.removeRaw;
      // deleteItem();
    },
    openEditDialog(item, data) {
      console.log(item, data);
    },
    itemClasses: (item) => ({
      // "yellow lighten-4": item.parent,
      "red lighten-4": item.status === "архив",
      nowrap: true,
    }),
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
    edit(name, addData) {
      console.log("name", name, addData);
    },
    add(name, addData) {
      console.log(name, addData);
    },
    handleClickRow(v) {
      window.open("/view/project?id=" + v.id);
    },
    async find() {
      console.log("FIND ");
      let v = this.dataTable[0];
      // this.selectMoreCatalog = {};
      const name = this.prepareSubCatalogsNAme("projects");
      const data = v.add.data
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

      this.loading = true;
      const dataFind = (await this.findCatalog(name, data)).data;
      v.table = dataFind.items;
      this.infoReport.amount = dataFind.info.countRows;
      this.loading = false;
      v.headers = v.table.length
        ? Object.keys(v.table[0])
            .filter((ff) => ["title", "status", "members"].includes(ff))
            .map((m) => {
              return {
                text: m === "members" ? "Моя роль в проекте" : m,
                align: "start",
                sortable: true,
                value: m,
                class: ["nowrap", "grey lighten-5"],
              };
            })
        : [];
      console.log(v);
      this.selectMoreCatalog = v;
    },
  },
};
</script>