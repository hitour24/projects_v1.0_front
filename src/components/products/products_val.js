import { mdiHelpCircleOutline } from "@mdi/js";
//import catalogsParam from './../settings/catalogs/params';
export default {
    dataTable: [{
        name: "products",
        // title: "Связки",
        // tooltip: '<b>Связки</b> - это соотношение источника, группы, площадки и воркера на заданный период, для построения финальных отчетов',
        // tooltipIcon: mdiHelpCircleOutline,
        table: [],
        icon: 'mdi-vector-triangle',
        headers: [],
        multi: false,
        add: {
            title: "Добавление продукта",
            titleEdit: "Редактирование продукта",
            name: "add_products",
            data: [
                {
                    type: "text",
                    title: "Название",
                    name: "title",
                    placeholder: "",
                    model: null,
                    items: [],
                    filter: true,
                    required: true,
                },
                // {
                //     type: "text",
                //     title: "Приоритет",
                //     name: "priority",
                //     placeholder: "",
                //     model: null,
                //     items: [],
                //     filter: true,
                //     required: true,
                // },
                {
                    type: "textarea",
                    title: "Описание",
                    name: "description",
                    placeholder: "",
                    block: true,
                    model: null,
                    items: [],
                    filter: false,
                    required: true,
                },
                {
                    type: "checkbox",
                    title: "Главный",
                    name: "main",
                    placeholder: "",
                    block: false,
                    model: false,
                    items: [],
                    filter: true,
                    required: true,
                },
                {
                    type: "select",
                    title: "Проект",
                    name: "id_project",
                    placeholder: "",
                    model: null,
                    required: true,
                    filter: true,
                    tooltip: `Вы можете выбрать проект для этого продукта или добавить продукт прямо из проекта`,
                    tooltipIcon: mdiHelpCircleOutline,
                    // addTempItemIcon: 'mdi-plus-thick',
                    // addTempData: catalogsParam.dataTable[0].add.data,
                    itemText: 'title',
                },
                {
                    type: "select",
                    title: "Статус",
                    name: "id_status_product",
                    placeholder: "",
                    model: null,
                    required: true,
                    filter: false,
                    // tooltip: `Вы можете создать статусы прямо отсюда, нажам на кнопку <b>+</b>, или перейти в <a href="/settings/catalogs" target="_blank">справчоники</a> и создать там`,
                    // tooltipIcon: mdiHelpCircleOutline,
                    // addTempItemIcon: 'mdi-plus-thick',
                    // addTempData: catalogsParam.dataTable[0].add.data,
                    itemText: 'title',
                },
                {
                    type: "select",
                    title: "Продукт-родитель",
                    name: "id_parent_product",
                    placeholder: "",
                    model: null,
                    required: false,
                    tooltip: `Вы можете выбрать продукт-родетля для иерархической структуры продуктов проекта`,
                    tooltipIcon: mdiHelpCircleOutline,
                    // addTempItemIcon: 'mdi-plus-thick',
                    // addTempData: catalogsParam.dataTable[0].add.data,
                    itemText: 'title',
                },
                {
                    type: "text",
                    title: "Ссылка на финальный продукт",
                    name: "finished_product",
                    placeholder: "",
                    block: false,
                    model: null,
                    items: [],
                    filter: false,
                    required: false,
                },
                {
                    type: "date",
                    title: "Дата добавления",
                    name: "date_create",
                    placeholder: "",
                    block: false,
                    model: null,
                    items: [],
                    filter: false,
                    required: true,
                },
                {
                    type: "date",
                    title: "Дата завершения (приемки)",
                    name: "date_completion",
                    placeholder: "",
                    block: false,
                    model: null,
                    items: [],
                    filter: false,
                    required: false,
                },
                {
                    type: "date",
                    title: "Дата исключения, заморозки",
                    name: "date_frozen",
                    placeholder: "",
                    block: false,
                    model: null,
                    items: [],
                    filter: false,
                    required: false,
                },
            ],
        },
    }],
}