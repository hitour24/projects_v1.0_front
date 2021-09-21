import { COLORS_ROLE_PROJECT } from "../constants";

export default {
    colorRoles:COLORS_ROLE_PROJECT,
    dialogErrorPermissions: false,
    removeRaw: null,
    editRaw: null,
    resetFormAddEdit: false,
    loading: false,
    dialogAddItem: false,
    dialogRemove: false,
    loadSubCatalog: false,
    loadAddRaw: false,
    infoReport: {
        amount: 0,
        sumShare1d: 0,
    },
    dialogHelpTooltip: false,
    helpTooltip: '',
    tempSubItems: [],
    addTempData: false,
    dialogAddTempItem: false,

    rules: {
        required: (value) => (value === false ? true : !!value) || "Обязательное поле.",
        // min: (v) => v.length >= 50 || "Min 8 characters",
        emailMatch: (value) =>
            /.+@.+\..+/.test(value) ||
            `The email and password you entered don't match`,
        doubleLogin: (label_input, model) => label_input.items && !label_input.items.find(
            (fe) => fe.login === model
        ) || "Пользователь с таким логином уже есть в системе!"
    },
}