<template>
  <div class="w-100">
    <v-form
      ref="formAddRawCatalog"
      v-if="filter.filter((f) => f.filter).length"
    >
      <v-row class="pa-0 ma-0" align="end">
        <v-col
          cols="12"
          sm="3"
          v-for="filterEdit in filter.filter((f) => f.filter)"
          :key="filterEdit.name"
        >
          <v-text-field
            v-if="filterEdit.type === 'text'"
            clearable
            v-model="filterEdit.model"
            :placeholder="filterEdit.placeholder"
            :label="filterEdit.title"
            hide-details
            :disabled="
              filterEdit.enabled
                ? !filter
                    .filter((f) => f.filter)
                    .find((f) => filterEdit.enabled === f.name).model
                : false
            "
          ></v-text-field>
          <v-menu
            v-model="dateReport"
            ref="menu"
            :close-on-content-click="false"
            v-if="filterEdit.type === 'date'"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="filterEdit.model"
                label="Даты"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                hide-details
                v-on="on"
                clearable
              ></v-text-field>
            </template>

            <v-date-picker range no-title v-model="filterEdit.model">
              <v-spacer></v-spacer>
              <v-btn
                class="new-btn"
                text
                color="primary"
                @click="dateReport = false"
              >
                Cancel
              </v-btn>
              <v-btn
                lass="new-btn"
                text
                color="primary"
                @click="$refs.menu[0].save(filterEdit.model)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
          <!-- {{
            filterEdit.enabled
              ? filter
                  .filter((f) => f.filter)
                  .find((f) => filterEdit.enabled === f.name).model
              : ""
          }} -->
          <v-autocomplete
            :color="filterEdit.color"
            :disabled="
              filterEdit.enabled
                ? !filter
                    .filter((f) => f.filter)
                    .find((f) => filterEdit.enabled === f.name).model
                : false
            "
            hide-details
            :multiple="filterEdit.multi"
            v-if="filterEdit.type === 'select'"
            :loading="loadDataFilter"
            :items="filterEdit.items ? filterEdit.items : []"
            @change="
              (e) => {
                filterEdit.model = e ? e.id : null;
                if (filterEdit.multi) {
                  filterEdit.model = e;
                }

                if (filterEdit.resetData && !e) {
                  filter
                    .filter((f) => f.filter)
                    .forEach((el) => {
                      el.model = null;
                    });
                }

                filter
                  .filter((f) => f.filter)
                  .forEach((el) => {
                    if (filterEdit.name === el.nameRatio) {
                      el.name = filterEdit.model;
                    }
                  });
              }
            "
            @focus="getSubCatalog(filterEdit.name)"
            v-model="filterEdit.model"
            :item-text="(e) => e.title"
            item-value="id"
            return-object
            :label="filterEdit.title"
            clearable
          >
          </v-autocomplete>

          <v-switch
            hide-details
            v-if="filterEdit.type === 'checkbox'"
            v-model="filterEdit.model"
            :label="filterEdit.title"
          ></v-switch>
        </v-col>
        <v-col sm></v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn class="new-btn" @click="find" elevation="0" color="primary"
            >Искать</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import commonVal from "./../../common_val";
export default {
  props: ["filter", "loadDataFilter"],
  data() {
    return {
      ...commonVal,
      dateReport: false,
    };
  },
  methods: {
    find() {
      this.$emit("find");
    },
    getSubCatalog(name) {
      console.log(name);
      this.$emit("getCatalogFromBlock", name);
    },
  },
};
</script>