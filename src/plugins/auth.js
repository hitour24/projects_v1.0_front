import { API_SETTINGS } from '../constants';
import { instance } from './vue-axios';
import Helper from './helper';
import './../components/auth/auth_val';

export default {


    /**
     * ПРоверка пароля
     * @param {*} nameCatalog 
     * @returns 
     */
    async checkPassword(bodyAuth = {}) {
        this.$auth.refresh();
        const headers = { "Content-type": "application/json" };
        return await new Promise((resolve, reject) => {
            instance.post(`${API_SETTINGS.CHECK_PASSWORD}`, JSON.stringify(bodyAuth), { headers: headers })
                .then((auth) => {

                    resolve(auth);
                })
                .catch((err) => {
                    this.loading = false;
                    this.err = Helper.errorHandler(err);
                    this.alertErrorSignIn = true;
                    reject();
                });
        });
    },

    /**
    * ОБновление имени
    * @param {*} nameCatalog 
    * @returns 
    */
    async updateName(body, more) {

        const headers = {
            "Content-type": "application/json",
            Authorization:
                "Bearer " + this.$auth.token(),
        };

        return await new Promise((resolve, reject) => {
            instance.put(`${API_SETTINGS.UPDATE_NAME}`, JSON.stringify(body), { headers: headers })
                .then((update) => {
                    resolve(update);
                })
                .catch((err) => {
                    if (err.response.status === 401) this.$auth.logout();
                    else {
                        more.edit = true;
                        this.loading = false;
                        this.err = Helper.errorHandler(err);
                        this.alertErrorSignIn = true;
                    }
                    reject();
                });
        });

    },


    /**
    * ОБновление фамилии
    * @param {*} nameCatalog 
    * @returns 
    */
    async updateSername(body, more) {

        const headers = {
            "Content-type": "application/json",
            Authorization:
                "Bearer " + this.$auth.token(),
        };

        return await new Promise((resolve, reject) => {
            instance.put(`${API_SETTINGS.UPDATE_SERNAME}`, JSON.stringify(body), { headers: headers })
                .then((update) => {
                    resolve(update);
                })
                .catch((err) => {
                    if (err.response.status === 401) this.$auth.logout();
                    else {
                        more.edit = true;
                        this.loading = false;
                        this.err = Helper.errorHandler(err);
                        this.alertErrorSignIn = true;
                    }
                    reject();
                });
        });

    },


    /**
    * ОБновление отчества
    * @param {*} nameCatalog 
    * @returns 
    */
    async updateSecondName(body, more) {

        const headers = {
            "Content-type": "application/json",
            Authorization:
                "Bearer " + this.$auth.token(),
        };

        return await new Promise((resolve, reject) => {
            instance.put(`${API_SETTINGS.UPDATE_SECONDNAME}`, JSON.stringify(body), { headers: headers })
                .then((update) => {
                    resolve(update);
                })
                .catch((err) => {
                    if (err.response.status === 401) this.$auth.logout();
                    else {
                        more.edit = true;
                        this.loading = false;
                        this.err = Helper.errorHandler(err);
                        this.alertErrorSignIn = true;
                    }
                    reject();
                });
        });

    },


    /**
    * ОБновление отчества
    * @param {*} nameCatalog 
    * @returns 
    */
    async updateContacts(body, more) {

        const headers = {
            "Content-type": "application/json",
            Authorization:
                "Bearer " + this.$auth.token(),
        };

        return await new Promise((resolve, reject) => {
            instance.put(`${API_SETTINGS.UPDATE_CONTACTS}`, JSON.stringify(body), { headers: headers })
                .then((update) => {
                    resolve(update);
                })
                .catch((err) => {
                    if (err.response.status === 401) this.$auth.logout();
                    else {
                        more.edit = true;
                        this.loading = false;
                        this.err = Helper.errorHandler(err);
                        this.alertErrorSignIn = true;
                    }
                    reject();
                });
        });

    },



    /**
    * ОБновление логина
    * @param {*} nameCatalog 
    * @returns 
    */
    async updateLogin(body, more) {

        const headers = {
            "Content-type": "application/json",
            Authorization:
                "Bearer " + this.$auth.token(),
        };

        return await new Promise((resolve, reject) => {
            instance.put(`${API_SETTINGS.UPDATE_EMAIL}`, JSON.stringify(body), { headers: headers })
                .then((update) => {
                    resolve(update);
                })
                .catch((err) => {
                    if (err.response.status === 401) this.$auth.logout();
                    else {
                        more.edit = true;
                        this.loading = false;
                        this.err = Helper.errorHandler(err);
                        this.alertErrorSignIn = true;
                    }
                    reject();
                });
        });

    },


    /**
    * ОБновление пароля
    * @param {*} nameCatalog 
    * @returns 
    */
    async updatePassword(body, more) {

        const headers = {
            "Content-type": "application/json",
            Authorization:
                "Bearer " + this.$auth.token(),
        };

        return await new Promise((resolve, reject) => {
            instance.put(`${API_SETTINGS.UPDATE_PASSWORD}`, JSON.stringify(body), { headers: headers })
                .then((update) => {
                    resolve(update);
                })
                .catch((err) => {
                    if (err.response.status === 401) this.$auth.logout();
                    else {
                        more.edit = true;
                        this.loading = false;
                        this.err = Helper.errorHandler(err);
                        this.alertErrorSignIn = true;
                    }
                    reject();
                });
        });

    },


}