<template>
  <div style="background: #f2f2f2" class="h-100">
    <v-row no-gutters justify="center" align="center" class="h-100 w-100">
      <v-card elevation="0" max-width="400px" class="pa-10 rounded-lg">
        <v-btn
          class="close-btn"
          icon
          light
          @click="
            () => {
              this.$emit('close', false);
              this.resetValidateRegistration();
              this.alertErrorCreateAccount = false;
              this.err = '';
            }
          "
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-row no-gutters justify="center">
          <v-card-title class="h1 pa-0 font-weight-bold"
            >Создать учетную запись</v-card-title
          >
          <v-form class="w-100" ref="formRegistration">
            <v-alert
              dense
              text
              style="font-size: 14px !important"
              color="red"
              class="mt-4"
              :value="alertErrorCreateAccount"
            >
              {{ err }}
            </v-alert>
            <v-row
              v-for="(reg, name) in registration"
              :key="name"
              no-gutters
              class="my-4"
            >
              <h5 class="w-100">{{ reg.label }}</h5>

              <v-text-field
                :rules="
                  ['name', 'sername', 'password'].includes(name)
                    ? [rules.required]
                    : name === 'login'
                    ? [rules.required, rules.emailMatch]
                    : []
                "
                class="mt-1"
                background-color="#ffffff"
                dense
                outlined
                :type="reg.type"
                :disabled="reg.disabled"
                :placeholder="reg.placeholder"
                hide-details
                :prepend-inner-icon="reg.icon"
                v-model="reg.model"
              >
              </v-text-field>
            </v-row>
            <v-btn
              @click="createAccount"
              elevation="0"
              block
              class="new-btn"
              color="primary"
              :loading="loading"
              :disabled="loading"
              >Зарегистрироваться</v-btn
            >
            <p class="subtitle-2 mb-0 mt-5 grey--text darken-3">
              Уже зарегистрировались?
              <v-btn
                @click="
                  () => {
                    this.$emit('close', false);
                    this.$emit('iversion');
                    this.$router.push({ path: 'login' });
                    this.resetValidateRegistration();
                    this.alertErrorCreateAccount = false;
                    this.err = '';
                  }
                "
                small
                class="link-btn"
                text
                color="primary"
                >Войдите</v-btn
              >
            </p>
          </v-form>
        </v-row>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alertErrorCreateAccount: false,
      err: "",
      loading: false,
      rules: {
        required: (value) => !!value || "Обязательное поле.",
        // min: (v) => v.length >= 50 || "Min 8 characters",
        emailMatch: (value) =>
          /.+@.+\..+/.test(value) ||
          `The email and password you entered don't match`,
      },
      registration: {
        name: {
          label: "Имя",
          disabled: false,
          placeholder: "Иван",
          icon: "",
          model: "",
          type: "text",
        },
        sername: {
          label: "Фамилия",
          disabled: false,
          placeholder: "Иванов",
          icon: "",
          model: "",
          type: "text",
        },
        secondname: {
          label: "Отчество",
          disabled: false,
          placeholder: "Иванович",
          icon: "",
          model: "",
          type: "text",
        },
        login: {
          label: "Эл. адрес",
          disabled: false,
          placeholder: "ivan@example.com",
          icon: "",
          model: "",
          type: "text",
        },
        password: {
          label: "Пароль",
          disabled: false,
          placeholder: "********",
          icon: "",
          model: "",
          type: "password",
        },
      },
    };
  },
  methods: {
    validateRegistration() {
      return this.$refs.formRegistration.validate();
    },
    resetValidateRegistration() {
      this.$refs.formRegistration.reset();
    },

    createAccount() {
      const curPath = this.$router.currentRoute.path;
      if (this.validateRegistration()) {
        this.alertErrorCreateAccount = false;
        this.err = "";
        this.loading = true;
        this.$auth
          .register({
            name: this.registration.name.model,
            sername: this.registration.sername.model,
            secondname: this.registration.secondname.model,
            login: this.registration.login.model,
            password: this.registration.password.model,
          })
          .then((response) => {
            this.loading = false;
            console.warn("SUCCESS register", response.data);
            this.alertErrorCreateAccount = false;
            if (curPath !== "/register") {
              this.$emit("close", false);
              this.resetValidateRegistration();
              this.alertErrorCreateAccount = false;
              this.err = "";
              this.$router.push({ path: curPath });
            }
          })
          .catch((err) => {
            this.loading = false;
            this.alertErrorCreateAccount = true;
            const e = err.response
              ? err.response.data.message
                ? err.response.data.message
                : err.message
                ? err.message
                : JSON.stringify(err)
              : err.message;
            this.err = e;
            console.error("ERROR! in register", e);
          });
      }
    },
  },
};
</script>