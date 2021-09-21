export default {
    password: null,
    modalSequrity: false,
    loading: false,
    rules: {
        required: (value) => !!value || "Обязательное поле.",
        // min: (v) => v.length >= 50 || "Min 8 characters",
        emailMatch: (value) =>
            /.+@.+\..+/.test(value) ||
            `The email and password you entered don't match`,
    },
    selectSection: null,
    loadInput: false,
    sectionMore: {},
    err: "",
    alertErrorSignIn: false,
    findTags: [],
    sections: {
        account: {
            title: "Учетная запись",
            name: "account",
            icon: "mdi-account-circle-outline",
        },
        sequrity: {
            title: "Безопасность",
            name: "sequrity",
            icon: "mdi-lock-outline",
        },
        // invoice: {
        //     title: "Реквизиты",
        //     name: "invoice",
        //     icon: "mdi-credit-card-outline",
        // },
        // orders: {
        //     title: "Заказы",
        //     name: "orders",
        //     icon: "mdi-shopping-outline",
        // },
    },
}