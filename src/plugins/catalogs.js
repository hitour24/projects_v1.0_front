// import axios from 'axios';
import { instance } from './vue-axios';
import { GET_CATALOGS, POST_CATALOGS, } from '../constants';
import Helper from './helper';
import '../components/settings/catalogs/params';
import '../components/common_val';
// const FileDownload = require('js-file-download');

export default {


    // /**
    //  * Дбавление в каталог
    //  * @param {*} data 
    //  * @returns 
    //  */
    // async saveProject(data = {}) {
    //     const headers = {
    //         "Content-type": "application/json",
    //         Authorization:
    //             "Bearer " + this.$auth.token(),
    //     };
    //     return await new Promise((resolve, reject) => {
    //         instance.post(`${POST_CATALOGS}${nameCatalog}`, JSON.stringify(data), { headers: headers })
    //             .then((dataCatalog) => {
    //                 Helper.createToast('Данные в справочник успешно добавлены', 'success');
    //                 resolve(dataCatalog);
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //                 if (err.response.status === 401) this.$auth.logout();
    //                 else {
    //                     Helper.errorHandler(err);
    //                     this.loadInput = false;
    //                     this.loadAddRaw = false;
    //                     this.loadSubCatalog = false;
    //                 }
    //                 reject();
    //             });
    //     });
    // },



    openDialogRemove() {
        this.dialogRemove = true;
    },
    closwDialogAddItem() {
        this.dialogAddItem = false;
        this.editRaw = null;
    },
    closeDialogRemove() {
        this.dialogRemove = false;
    },
    itemClasses: () => ({
        nowrap: true,
    }),

    /**
     * Эеспорт финального отчета в Excel
     * @param {*} nameCatalog 
     * @returns 
     */
    // async exportFinalReportExcel(grouping = '', dataFind = {}) {
    //     const headers = {
    //         "Content-type": "application/json",
    //         Authorization:
    //             "Bearer " + this.$auth.token(),
    //     };
    //     return await new Promise((resolve, reject) => {
    //         instance.post(`${POST_FINAL_REPORT_EXPORT_EXCEL}${grouping}/find/`, JSON.stringify(dataFind), { responseType: 'blob', headers: headers })
    //             .then((finderFinalReport) => {

    //                 let currentDate = new Date().toLocaleString('ru-RU').split(', ')[0].replace(/\./g, '_');
    //                 console.log(finderFinalReport);
    //                 FileDownload(finderFinalReport.data, `final_report_${currentDate}.xlsx`);

    //                 resolve(finderFinalReport);
    //             })
    //             .catch((err) => {
    //                 if (err.response.status === 401) this.$auth.logout();
    //                 else {
    //                     Helper.errorHandler(err);
    //                     this.loadInput = false;
    //                     this.loadAddRaw = false;
    //                     this.loadSubCatalog = false;
    //                 }
    //                 reject();
    //             });
    //     });
    // },


    /**
     * Получение даыннх строки катлога по id
     * @param {*} nameCatalog 
     * @returns 
     */
    // async getFromCatalogById(nameCatalog = '', id) {
    //     const headers = {
    //         "Content-type": "application/json",
    //         Authorization:
    //             "Bearer " + this.$auth.token(),
    //     };
    //     return await new Promise((resolve, reject) => {
    //         instance.get(`${POST_CATALOGS}${nameCatalog}/${id}`, { headers: headers })
    //             .then((getCatalogById) => {

    //                 // finderCatalog.data.items = finderCatalog.data.items.map((m) => {
    //                 //     const res = {
    //                 //         ...m,
    //                 //     }
    //                 //     if (m.from)
    //                 //         res.from = Helper.convertDateToFormat((new Date(m.from)).toLocaleString('ru-RU').split(', ')[0]);
    //                 //     if (m.to)
    //                 //         res.to = Helper.convertDateToFormat((new Date(m.to)).toLocaleString('ru-RU').split(', ')[0]);
    //                 //     if (m.date)
    //                 //         res.date = Helper.convertDateToFormat((new Date(m.date)).toLocaleString('ru-RU').split(', ')[0]);
    //                 //     return res;
    //                 // }
    //                 // );
    //                 resolve(getCatalogById);
    //             })
    //             .catch((err) => {
    //                 if (err.response.status === 401) this.$auth.logout();
    //                 else {
    //                     Helper.errorHandler(err);
    //                     // this.loadInput = false;
    //                     // this.loadAddRaw = false;
    //                     // this.loadSubCatalog = false;
    //                 }
    //                 reject();
    //             });
    //     });
    // },



    /**
     * ПОиск в отчете
     * @param {*} nameCatalog 
     * @returns 
     */
    async findCatalog(nameCatalog = '', dataFind = {}) {
        await this.$auth.refresh();
        await this.$auth.fetchUser();

        const headers = {
            "Content-type": "application/json",
            Authorization:
                "Bearer " + this.$auth.token(),
        };
        return await new Promise((resolve, reject) => {
            instance.post(`${POST_CATALOGS}${nameCatalog}/find`, JSON.stringify(dataFind), { headers: headers })
                .then((finderCatalog) => {

                    finderCatalog.data.items = finderCatalog.data.items.map((m) => {
                        const res = {
                            ...m,
                        }
                        if (m.from)
                            res.from = Helper.convertDateToFormat((new Date(m.from)).toLocaleString('ru-RU').split(', ')[0]);
                        if (m.to)
                            res.to = Helper.convertDateToFormat((new Date(m.to)).toLocaleString('ru-RU').split(', ')[0]);
                        if (m.date)
                            res.date = Helper.convertDateToFormat((new Date(m.date)).toLocaleString('ru-RU').split(', ')[0]);
                        if (m.date_initiation)
                            res.date_initiation = Helper.convertDateToFormat((new Date(m.date_initiation)).toLocaleString('ru-RU').split(', ')[0]);
                        if (m.date_completion)
                            res.date_completion = Helper.convertDateToFormat((new Date(m.date_completion)).toLocaleString('ru-RU').split(', ')[0]);
                        if (m.date_frozen)
                            res.date_frozen = Helper.convertDateToFormat((new Date(m.date_frozen)).toLocaleString('ru-RU').split(', ')[0]);
                        if (m.date_start)
                            res.date_start = Helper.convertDateToFormat((new Date(m.date_start)).toLocaleString('ru-RU').split(', ')[0]);
                        if (m.date_success)
                            res.date_success = Helper.convertDateToFormat((new Date(m.date_success)).toLocaleString('ru-RU').split(', ')[0]);
                        if (m.date_create)
                            res.date_create = Helper.convertDateToFormat((new Date(m.date_create)).toLocaleString('ru-RU').split(', ')[0]);
                        return res;
                    }
                    );
                    resolve(finderCatalog);
                })
                .catch((err) => {
                    if (err.response.status === 401) this.$auth.logout();
                    else {
                        Helper.errorHandler(err);
                        this.loadInput = false;
                        this.loadAddRaw = false;
                        this.loadSubCatalog = false;
                    }
                    reject();
                });
        });
    },


    prepareSubCatalogsNAmeEdit(initName) {
        switch (initName) {
            case 'id_project':
                return "project";
            case 'id_status_objective':
            case 'id_status_product':
                return "status";
            case 'id_type_objective':
                return 'type_objective'
            case 'id_parent_product':
            case 'id_parent_objective':
                return 'parent'
            // case 'id_role':
            //     return 'role'
            case 'id_role_project':
                return 'role_project_title'
            default:
                return initName;
        }
    },



    prepareSubCatalogsNAme(initName) {
        switch (initName) {
            case 'id_status_project':
                return "statuses_projects";
            case 'id_project':
                return "projects";
            case 'id_type_objective':
                return "type_objective";
            case 'id_parent_objective':
                return "objectives";
            case 'id_status_objective':
                return "statuses_objectives";
            case 'id_parent_product':
                return "products";
            case 'id_status_product':
                return "statuses_products";
            case 'id_role':
                return "roles";
            case "id_role_project":
                return "roles_project"
            default:
                return initName;
        }
    },





    /**
     * Получение каталога
     * @param {*} nameCatalog 
     * @returns 
     */
    async getCatalog(nameCatalog = '') {
        await this.$auth.refresh();
        await this.$auth.fetchUser();
        const headers = {
            "Content-type": "application/json",
            Authorization:
                "Bearer " + this.$auth.token(),
        };
        return await new Promise((resolve, reject) => {
            instance.get(`${GET_CATALOGS}${nameCatalog}`, { headers: headers })
                .then((dataCatalog) => {
                    console.log(dataCatalog.data.items);
                    dataCatalog.data.items = dataCatalog.data.items.map((m) => {
                        const res = {
                            ...m,
                        }
                        if (m.from)
                            res.from = Helper.convertDateToFormat((new Date(m.from)).toLocaleString('ru-RU').split(', ')[0]);
                        if (m.to)
                            res.to = Helper.convertDateToFormat((new Date(m.to)).toLocaleString('ru-RU').split(', ')[0]);
                        if (m.date)
                            res.date = Helper.convertDateToFormat((new Date(m.date)).toLocaleString('ru-RU').split(', ')[0]);
                        return res;
                    }
                    );
                    resolve(dataCatalog);
                })
                .catch((err) => {
                    if (err.response.status === 401) this.$auth.logout();
                    else {
                        Helper.errorHandler(err);
                        this.loadInput = false;
                        this.loadAddRaw = false;
                        this.loadSubCatalog = false;
                    }
                    reject();
                });
        });
    },


    /**
     * Дбавление в каталог
     * @param {*} data 
     * @returns 
     */
    async addToCatalog(nameCatalog = '', data = {}) {
        await this.$auth.refresh();
        await this.$auth.fetchUser();
        const headers = {
            "Content-type": "application/json",
            Authorization:
                "Bearer " + this.$auth.token(),
        };
        return await new Promise((resolve, reject) => {
            instance.post(`${POST_CATALOGS}${nameCatalog}`, JSON.stringify(data), { headers: headers })
                .then((dataCatalog) => {
                    Helper.createToast('Данные в справочник успешно добавлены', 'success');
                    resolve(dataCatalog);
                })
                .catch((err) => {
                    console.log(err);
                    if (err.response.status === 401) this.$auth.logout();
                    else {
                        Helper.errorHandler(err);
                        this.loadInput = false;
                        this.loadAddRaw = false;
                        this.loadSubCatalog = false;
                    }
                    reject();
                });
        });
    },


    /**
   * Удаление из каталога
   * @param {*} data 
   * @returns 
   */
    async removeFromCatalog(nameCatalog = '', id) {
        await this.$auth.refresh();
        await this.$auth.fetchUser();
        const headers = {
            "Content-type": "application/json",
            Authorization:
                "Bearer " + this.$auth.token(),
        };
        console.log(id);
        return await new Promise((resolve, reject) => {
            instance.post(`${POST_CATALOGS}${nameCatalog}/remove`, JSON.stringify({ id: id }), { headers: headers })
                .then((dataCatalog) => {
                    Helper.createToast('Данные из справочника успешно удалены', 'success');
                    resolve(dataCatalog);
                })
                .catch((err) => {
                    if (err.response.status === 401) this.$auth.logout();
                    else {
                        Helper.errorHandler(err);
                        this.loadInput = false;
                        this.loadAddRaw = false;
                        this.loadSubCatalog = false;
                    }
                    reject();
                });
        });
    },

    /**
  * Обновление каталога
  * @param {*} data 
  * @returns 
  */
    async updateToCatalog(nameCatalog = '', data = {}, id) {
        await this.$auth.refresh();
        await this.$auth.fetchUser();
        const headers = {
            "Content-type": "application/json",
            Authorization:
                "Bearer " + this.$auth.token(),
        };
        return await new Promise((resolve, reject) => {
            console.log(id, data);
            instance.put(`${POST_CATALOGS}${nameCatalog}/${id}`, JSON.stringify(data), { headers: headers })
                .then((dataCatalog) => {
                    Helper.createToast('Данные в справочнике успешно обновлены', 'success');
                    resolve(dataCatalog);
                })
                .catch((err) => {
                    if (err.response.status === 401) this.$auth.logout();
                    else {
                        Helper.errorHandler(err);
                        this.loadInput = false;
                        this.loadAddRaw = false;
                        this.loadSubCatalog = false;

                    }
                    reject();
                });
        });
    }

}
