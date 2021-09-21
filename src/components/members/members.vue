<template>
  <div>
    <div class="ma-3">
      <h1>Пользователи</h1>
      <v-row no-gutters>
        <v-col class="w-100">
          <TableUnit
            :infoReport="infoReport"
            :loadAddRaw="loadAddRaw"
            :loading="loading"
            :itemClasses="itemClasses"
            :dataTable="dataTable[0]"
            :dialogAddItem="dialogAddItem"
            :actionsButtons="true"
            :dialogRemove="dialogRemove"
            :loadSubCatalog="loadSubCatalog"
            :helpbox="[
              { color: 'yellow lighten-4', title: 'с проектом' },
              { color: 'green lighten-4', title: 'администраторы' },
            ]"
            :expandable="{
              field: 'projects',
              filterFields: (f) => !['role', 'role_project'].includes(f),
            }"
            :chips="{
              field: 'projects',
              slot: `item.projects`,
              ifnull: 'Расширенные права',
              filter: (f) => f,
              color: (v) => colorRoles[v.role_project],
              title: 'role_project_title',
            }"
            :boolsCheckIcon="{
              field: 'edit',
              slot: `item.edit`,
              icon: 'mdi-check-bold',
              color: 'green',
            }"
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
            @changeSubSelect="changeSubSelect"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import TableUnit from "../units/table/table.vue";
import membersVal from "./members_val";
import commonVal from "./../common_val";
import catalogs from "./../../plugins/catalogs";
export default {
  components: {
    TableUnit,
  },
  data() {
    return {
      ...membersVal,
      ...commonVal,
    };
  },
  async mounted() {
    await this.find();
  },
  methods: {
    ...catalogs,
    //Если выбираем "Ограниченный администрартор" то даем выбор проектов для него
    changeSubSelect(v) {
      if (v.name === "id_role") {
        const allowedProjectsSelect = this.dataTable[0].add.data.find(
          (_f) => _f.name === "projects"
        );
        allowedProjectsSelect.hiddenDiaog = true;
        let nameRole = v.items.find((f) => f.id === v.model);
        nameRole = nameRole ? nameRole.name : null;
        if (nameRole && nameRole === "limited_admin") {
          if (allowedProjectsSelect) {
            allowedProjectsSelect.hiddenDiaog = false;
          }
        } else if (nameRole && nameRole !== "limited_admin") {
          allowedProjectsSelect.model = [];
        }
        console.log("nameRole", nameRole);
      }
    },
    async remove(v) {
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
      // deleteItem()
    },
    itemClasses: (item) => ({
      "yellow lighten-4": item.projects.length,
      "green lighten-4": item.role_title.toLowerCase() === "администратор",
      nowrap: true,
    }),
    /**
     * Инициализация редактирвоания
     */
    async openEditDialog(item, selectMoreCatalog) {
      console.log("selectMoreCatalog", selectMoreCatalog);
      this.dialogAddItem = true;
      item["name_catalog"] = selectMoreCatalog.name;
      this.editRaw = item;
      this.loadSubCatalog = true;
      const projectsItem = selectMoreCatalog.add.data.find(
        (f) => f.name === "projects"
      );
      projectsItem.hiddenDiaog = true;
      projectsItem.model = [];

      selectMoreCatalog.add.data = await Promise.all(
        selectMoreCatalog.add.data
          // .filter((f) => f.name !== "permissions")
          .map(async (m) => {
            let model = item[this.prepareSubCatalogsNAmeEdit(m.name)];
            console.log("MODEL", model, item);

            if (m.type === "select") {
              await this.getSubCatalog(m.name);

              const multiModel = () => {
                if (m.name !== "projects") {
                  return m.items.filter((f) =>
                    model.split(",").includes(f.name)
                  );
                }
              };

              const sibleModel = () => {
                // console.log(m.items);
                return m.items.find((f) => {
                  let fullNameItem = f[m.itemText];

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
      const role = selectMoreCatalog.add.data.find((f) => f.name === "id_role");
      this.changeSubSelect(role);
      const permissions = selectMoreCatalog.add.data.find(
        (f) => f.name === "permissions"
      ).items;
      const pjs = selectMoreCatalog.add.data.find((f) => f.name === "projects");

      pjs.model = pjs.items.filter((_fp) =>
        permissions.map((_mpa) => _mpa.id_project).includes(_fp.id)
      );
      console.log(role);
      if (role.items.find((f) => f.id === role.model).name !== "limited_admin")
        pjs.model = [];

      this.loadSubCatalog = false;
    },
    /**
     * Инициализация добавления
     */
    async openAddDialog(data) {
      const projectsItem = data.add.data.find((f) => f.name === "projects");
      projectsItem.hiddenDiaog = true;
      projectsItem.model = [];
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
      await this.find();
      this.loadAddRaw = false;
      this.dialogAddItem = false;
      this.resetFormAddEdit = !this.resetFormAddEdit;
      this.editRaw = null;
    },
    async add(name, data) {
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
      console.log(data);
      this.loadAddRaw = true;
      await this.addToCatalog(name, data);
      await this.find();
      this.loadAddRaw = false;
      this.dialogAddItem = false;
      this.resetFormAddEdit = !this.resetFormAddEdit;
    },
    async find() {
      let v = this.dataTable[0];
      // this.selectMoreCatalog = {};
      const name = this.prepareSubCatalogsNAme("userauth");
      console.log("find member", v.add.data);
      const data = v.add.data
        .filter((f) => f.filter)
        .reduce((acc, el) => {
          return {
            ...acc,
            ...{
              [el.name]:
                el.multi && el.model
                  ? el.model.map((m) => m.name).join(",")
                  : el.model === undefined
                  ? null
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
            .filter((ff) =>
              ["name", "sername", "login", "role_title", "projects"].includes(
                ff
              )
            )
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
  },
};
</script>