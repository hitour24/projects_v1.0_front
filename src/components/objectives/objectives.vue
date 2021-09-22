<template>
  <div>
    <div class="ma-3">
      <h1>Цели</h1>
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
              { color: 'yellow lighten-4', title: 'дочерние цели' },
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
import objectivesVal from "./objectives_val";
import commonVal from "./../common_val";
import catalogs from "./../../plugins/catalogs";
export default {
  components: {
    TableUnit,
  },
  data() {
    return {
      ...objectivesVal,
      ...commonVal,
    };
  },
  async mounted() {
    await this.find();
  },
  methods: {
    ...catalogs,
    focusSubSelect(v) {
      if (v.name === "id_parent_objective") {
        const typeObjective = this.dataTable[0].add.data.find(
          (f) => f.name === "id_type_objective"
        );
        console.log(typeObjective);
        if (typeObjective.model) {
          const statusesObjective = this.dataTable[0].add.data.find(
            (f) => f.name === "id_status_objective"
          );
          const idProject = this.dataTable[0].add.data.find(
            (f) => f.name === "id_project"
          );
          v.items = v.itemsAll.filter(
            (__f) =>
              //Выбираем только цели выбранного проекта
              __f.id_project === idProject.model &&
              // + только те цели которые соответствуют блокам
              this.filterParentObjectives[
                typeObjective.items.find((_i) => _i.id === typeObjective.model)
                  .title
              ].includes(
                typeObjective.items.find(
                  (_i) => _i.id === __f.id_type_objective
                ).title
              ) &&
              //+ только те цели которые не в архиве
              statusesObjective.items.find(
                (fs) => fs.id === __f.id_status_objective
              ).title !== "архив" &&
              //+ запрет выбора себя же
              __f.id !== (this.editRaw ? this.editRaw.id : "no")
          );
        }
        // console.log(statusesObjective);
        // console.log(v, typeObjective);
      }
      //При клике на флаге "Тип целит" или поле "Проект" или полея "Архив" очищаем "родителя цели"
      if (
        ["id_type_objective", "id_project", "id_status_objective"].includes(
          v.name
        )
      ) {
        const parentObjective = this.dataTable[0].add.data.find(
          (f) => f.name === "id_parent_objective"
        );
        parentObjective.model = null;
      }
    },

    itemClasses: (item) => ({
      "yellow lighten-4": item.parent,
      "red lighten-4": item.status === "архив",
      // nowrap: true,
    }),

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
            m.name === "id_status_objective" &&
            m.items.find((_f) => _f.id === model).title === "активный"
          ) {
            m.disabled = true;
          } else if (
            m.name === "id_status_objective" &&
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
            if (m.name === "id_status_objective") m.disabled = false;
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
        if (catalog.add) {
          catalog.add.data.forEach((selects) => {
            if (selects.name === name) {
              console.log("selects", selects);
              // if (selects.name === "id_status_objective") {
              //   console.log("this.itemsSub", selects.model);
              //   // this.itemsSub = this.itemsSub.filter(
              //   //   (f) => f.title !== "архив"
              //   // );
              // }
              selects.items = this.itemsSub;
              selects.itemsAll = this.itemsSub;
              // if (selects.multi)
              // selects.model = this.itemsSub.filter((f) =>
              //   selects.model.split(",").includes(f.name)
              // );
              // console.log(nameSelect, this.catalogs);
            }
          });
        }
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
      const name = this.prepareSubCatalogsNAme("objectives");
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
.truncate {
  display: inline-block;
  /* width: 200px; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

::v-deep .nowrap {
  white-space: nowrap !important;
}

::v-deep .sortable span:nth-child(3) {
  position: relative;
  width: 15px;
  height: 15px;
  color: rgba(0, 0, 0, 0);
}
::v-deep .sortable span:nth-child(3)::before {
  content: "";
  left: 0;
  top: 0;
  width: 15px;
  position: absolute;
  height: 15px;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAADbN2wMAAAD/ElEQVRoBe2YWahOURTHDRkzT2Wey1CmFOLFCw8ImYWQUB6k5EEpyoPywoMXMkse8GLI9GDKFEqkRNc8ZZ7n4fevu2rd3Rmue797vq98q36d/957nbPXHs46+/uqVStacQb+7xmonufhN6X/4dAJakIJnIYXUNDWkug2wTf4E/Cd8i5oBwVpA4jqGYSBh2WtwtC0EWS9hToQ0FVoXhqYVmA7nAMNYCDMgsYgeweD4JYKhWAHCcJm+hq6a0RQ2l6nnJ90QVhvorDgtYWS9ngj2u86/8HoSKsRWVs1lWPdY9ehH7lyKN9Tsd5VjnG6jMxyAD1cz2ecjpPHXUNPp8vILAdQx/X8xek4qXRqVtdEeM1yAI9d572cjpPKWGZPTOTzOo/O7SV+gE5L4bud/2x0zqw+TxoGk2AcdIYk0/Ivhw9gA9B1GcTZTBp+g/xeg30XkBW3jty6BT6BD0RaOX0ahDaBihII/a2s40Q3d1N3tOp+gfkscu0VlqO5U19Fe2jcdS8+9UBZ40jgrxndAQowvF/Hhs8R9ZupS9tquCTbcJr9oesj5W2gbbEGdDTwAd2h/DOou0h5CJgtQUQFbM9RltLzKx289vt9sAcfRreF0KZQEbW19LJOhahAWlO/As6CMpQyjc5Eq6A95MQW8hQL/gJa2yPOFtBgvtouK0ETkFc7Ru8WlN8CcUHddv7945xyWZ/2IetT2pnOJlqBNNvpHOxeV5V7mTaABqVd2v5Oi0CZyiyT7ZM2gOel0TTl2sgiS7i2cW1KjXk3bQl7B+amRFOXdqVY+esl7gB5t5FEYAN4je6SENFW56t7wtwfd6t+XvaFftAizqky9ce52QbxCK3zT033QH3+94D5+KtWYheEv760daeDBikfu0f6MswB3wfFips+OPq6Wie6voRLcA/Cr+4G6m6A91cSWANKCs3AT4r38/oMfq0gJ6av70nwHYRap82ZIKsFi+EteD+tYElQd5PyNtgK18D7ayIaQk5Myz4eDsAbUEff4TqshqjZUt1G+AU+MGmtYtRv3RHUP3X+m9BVYv+S5/sTwXmwQWivqy7OetKgFZW/tmhS8qA5G5tPNzaAg+XoUqtq/kvj/LUtsjKlSbO1JhKu+11b7GplOQBlH7NnJhKuT1xbc6fLyCwH8Mr1rKyWZv7bEXssyXIAV1zEk5yOk5Ndgz5uebcWRGCnWqXfoQkR6X35DHqJv0HOfqHxrEqZzyzveNIM8D83pSeCtptloHXogrHaRHISLDhdH4Iyzl64B75Nx5V6UFCm89A+8IFG6UP4NCmoyINgRlE+CtrjNoAf6BMwHsplfv+V64YqcNIPoTagWPT3ylcoWnEGijPwv8zAX6b6TqcNnAg+AAAAAElFTkSuQmCC")
    no-repeat;
  background-size: cover;
}
</style>