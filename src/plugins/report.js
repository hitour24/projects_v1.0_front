import Vue from 'vue';
import { GET_DETAIL_REPORT } from '../constants';
import { instance } from './vue-axios';

const report = {
    install(Vue, options) {
        Vue.prototype.findDetail = async (dataFilter = {}) => {
            return await new Promise((resolve, reject) => {
                const { dateFrom, dateTo, page, per, fieldSort, dirSort } = dataFilter;
                options.get(`${GET_DETAIL_REPORT}/dateFrom=${dateFrom}&dateTo=${dateTo}&page=${page}&per=${per}&fieldSort=${fieldSort}&dirSort=${dirSort}`)
                    .then((detailReport) => {
                        resolve(
                            {
                                count: detailReport.data.count,
                                amount: detailReport.data.amount,
                                data: detailReport.data.data.map((m) => {
                                    return {
                                        ...m,
                                        id: undefined,
                                        date: new Date(m.date).toLocaleString("ru-RU").split(', ')[0]
                                    }
                                })
                            }
                        );
                    })
                    .catch((err) => {
                        this.errorHandler(err);
                        reject();
                    });
            });
        }
    },
}

Vue.use(report, instance);