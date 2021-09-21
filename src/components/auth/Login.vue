<template>
  <div style="background: #f2f2f2" class="h-100">
    <!-- sign in account -->
    <v-row no-gutters justify="center" align="center" class="h-100 w-100">
      <v-card elevation="0" max-width="400px" class="pa-10 rounded-lg">
        <v-btn
          class="close-btn"
          icon
          light
          @click="
            () => {
              this.$emit('close', false);
              this.resetValidateSignIn();
              this.alertErrorSignIn = false;
              this.err = '';
            }
          "
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-row no-gutters justify="center">
          <v-card-title class="h1 pa-0 font-weight-bold"
            >Вход в учетную запись</v-card-title
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

            <v-row
              v-for="(sign, name) in signin"
              :key="name"
              no-gutters
              class="my-4"
            >
              <h5 class="w-100">{{ sign.label }}</h5>

              <v-text-field
                :rules="
                  name === 'name'
                    ? [rules.required]
                    : name === 'email'
                    ? [rules.required, rules.emailMatch]
                    : [rules.required]
                "
                class="mt-1"
                background-color="#ffffff"
                dense
                outlined
                :type="sign.type"
                :disabled="sign.disabled"
                :placeholder="sign.placeholder"
                hide-details
                :prepend-inner-icon="sign.icon"
                v-model="sign.model"
              >
              </v-text-field>
            </v-row>
            <v-btn
              @click="signIn"
              elevation="0"
              block
              :loading="loading"
              :disabled="loading"
              class="new-btn"
              color="primary"
              >Войти</v-btn
            >
            <p class="subtitle-2 mb-0 mt-5 grey--text darken-3">
              Нет аккаунта?
              <v-btn
                @click="
                  () => {
                    this.$emit('close', false);
                    this.$emit('iversion');
                    this.$router.push({ path: 'register' });
                    this.resetValidateSignIn();
                    this.alertErrorSignIn = false;
                    this.err = '';
                  }
                "
                small
                class="link-btn"
                text
                color="primary"
                >Зарегистрируйтесь</v-btn
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
      err: "",
      loading: false,
      signin: {
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
      alertErrorSignIn: false,
      rules: {
        required: (value) => !!value || "Обязательное поле.",
        // min: (v) => v.length >= 50 || "Min 8 characters",
        emailMatch: (value) =>
          /.+@.+\..+/.test(value) ||
          `The email and password you entered don't match`,
      },
    };
  },
  methods: {
    validateSignIn() {
      return this.$refs.formSignIn.validate();
    },
    resetValidateSignIn() {
      this.$refs.formSignIn.reset();
    },
    signIn() {
      const curPath = this.$router.currentRoute.path;
      if (this.validateSignIn()) {
        this.err = "";
        this.loading = true;
        this.alertErrorSignIn = false;
        this.$auth
          .login({
            login: this.signin.login.model,
            password: this.signin.password.model,
          })
          .then((response) => {
            this.loading = false;
            console.warn("SUCCESS login", response, curPath);
            if (curPath !== "/login") {
              this.$emit("close", false);
              this.resetValidateSignIn();
              this.alertErrorSignIn = false;
              this.err = "";
              this.$router.push({ path: curPath });
            }
          })
          .catch((err) => {
            this.loading = false;
            const e = err.response
              ? err.response.data.message
                ? err.response.data.message
                : err.message
                ? err.message
                : JSON.stringify(err)
              : err.message;
            this.err = e;
            console.error("ERROR! in login", e);
            this.alertErrorSignIn = true;
          });
      }
    },
  },
};
</script>