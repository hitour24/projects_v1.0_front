import Vue from 'vue'

export default {

    unique(arr, key) {
        const keys = new Set();
        return arr.filter((el) => el ? !keys.has(el[key]) && keys.add(el[key]) : el);
    },

    generateAvatar() {
        return this.$auth.user()
            ? ("name" in this.$auth.user()
                ? decodeURIComponent(this.$auth.user().name).slice(0, 1)
                : "P") +
            ("sername" in this.$auth.user()
                ? decodeURIComponent(this.$auth.user().sername).slice(0, 1)
                : "P")
            : "PP"
    },

    arrayFromObject(obj) {
        let arr = [];
        for (let i in obj) {
            arr.push(obj[i]);
        }
        return arr;
    },

    groupBy(list, fn) {
        let groups = {};
        for (let i = 0; i < list.length; i++) {
            let group = JSON.stringify(fn(list[i]));
            if (group in groups) {
                groups[group].push(list[i]);
            } else {
                groups[group] = [list[i]];
            }
        }
        return this.arrayFromObject(groups);
    },

    errorHandler(err) {
        console.log('ERROR IN ' + err);
        const e = err.response
            ? err.response.data.message
                ? err.response.data.message
                : err.message
                    ? err.message
                    : JSON.stringify(err)
            : err.message;
        console.error(e);
        this.createToast("Ошибка! " + e, 'error');
        return e;
    },

    convertDateToFormat(date, separator = '-') {
        const split = date.split('.');
        split.reverse();
        return split.join(separator);
    },

    getLastDayOfMonth(month) {
        let date = new Date(new Date().getFullYear(), month + 1, 0);
        return date.getDate();
    },

    getPeriodUnMonth(month) {
        console.log(month);
        const d = new Date();
        return [`${d.getFullYear()}-${month < 10 ? '0' + month : month}-01`, `${d.getFullYear()}-${month < 10 ? '0' + month : month}-${this.getLastDayOfMonth(month - 1)}`]
    },
    getToday() {
        const dateToday = new Date().toLocaleString('ru-RU').split(', ')[0].split('.');
        return `${dateToday[2]}-${dateToday[1]}-${dateToday[0]}`
    },
    createToast(text, type) {
        Vue.$toast(text, {
            type: type, // or "success", "error", "default", "info" and "warning"
        });
    },
}