<template>
  <div>
    <div class="ma-3">
      <h1>Продукты</h1>
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
            :actionsButtons="true"
            :showGroup="true"
            :helpbox="[
              { color: 'yellow lighten-4', title: 'дочерние продукты' },
              { color: 'red lighten-4', title: 'в архиве' },
            ]"
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
            @focusSubSelect="focusSubSelect"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import TableUnit from "../units/table/table.vue";
import productsVal from "./products_val";
import commonVal from "./../common_val";
import catalogs from "./../../plugins/catalogs";
export default {
  components: {
    TableUnit,
  },
  data() {
    return {
      ...productsVal,
      ...commonVal,
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

    focusSubSelect(v) {
      if (v.name === "id_parent_product") {
        const statusesProduct = this.dataTable[0].add.data.find(
          (f) => f.name === "id_status_product"
        );
        const idProject = this.dataTable[0].add.data.find(
          (f) => f.name === "id_project"
        );
        const thisMain = this.dataTable[0].add.data.find(
          (f) => f.name === "main"
        );

        v.items = v.itemsAll.filter(
          (__f) =>
            //Выбираем только цели выбранного проекта
            __f.id_project === idProject.model &&
            // + только главный продукт и главный продукт / обычный продукт с обычным продуктом
            __f.main === thisMain.model &&
            //+ только те продукты, которые не в архиве
            statusesProduct.items.find((fs) => fs.id === __f.id_status_product)
              .title !== "архив" &&
            //+ запрет выбора себя же
            __f.id !== (this.editRaw ? this.editRaw.id : "no")
        );

        console.log(v.itemsAll);
      }
      //При клике на флаге "Главый продукт" или поле "Проект" очищаем "родителя проекта"
      if (["main", "id_project"].includes(v.name)) {
        const parentProduct = this.dataTable[0].add.data.find(
          (f) => f.name === "id_parent_product"
        );
        if (v.name === "main") {
          const oldStatusMain = !v.model;
          const newStatusMain = v.model;
          //Елси попадается прдукт не главный прикоепенный к уже главному то снимаем его ка кродителя
          this.dataTable[0].table.forEach((el) => {
            if (el.parent === this.editRaw.title) {
              // console.log(el.main);
              if (newStatusMain !== el.main) {
                console.log(el);
                v.model = oldStatusMain;
                console.log(v.model, oldStatusMain);
              }
            }
          });
        }
        parentProduct.model = false;
      }
    },

    itemClasses: (item) => ({
      "yellow lighten-4": item.parent,
      "red lighten-4": item.status === "архив",
      nowrap: true,
    }),

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
          let model = item[this.prepareSubCatalogsNAmeEdit(m.name)];
          console.log("MODEL", model, item);

          if (m.type === "select") {
            await this.getSubCatalog(m.name);

            const multiModel = () => {
              return m.items.filter((f) => model.split(",").includes(f.name));
            };

            const sibleModel = () => {
              console.log(m.items);
              return m.items.find((f) => {
                let fullNameItem = f[m.itemText];

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

          if (
            m.name === "id_status_product" &&
            m.items.find((_f) => _f.id === model).title === "активный"
          ) {
            m.disabled = true;
          } else if (
            m.name === "id_status_product" &&
            m.items.find((_f) => _f.id === model).title === "архив"
          ) {
            m.disabled = false;
          }

          return {
            ...m,
            model: model,
          };
        })
      );
      console.log("selectMoreCatalog.add.data ", selectMoreCatalog.add.data);
      this.loadSubCatalog = false;
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
            if (m.name === "id_status_product") m.disabled = false;
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
              selects.itemsAll = this.itemsSub;
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
      const name = this.prepareSubCatalogsNAme("products");
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
            // .filter((ff) => ["title", "status"].includes(ff))
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

<style scoped>
::v-deep .nowrap {
  white-space: nowrap !important;
}
</style>