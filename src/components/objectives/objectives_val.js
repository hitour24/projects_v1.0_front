import { mdiHelpCircleOutline } from "@mdi/js";
//import catalogsParam from './../settings/catalogs/params';
export default {
    filterParentObjectives: {
        "Основная решаемая проблема": [],
        "Решаемая проблема": ["Основная решаемая проблема", "Решаемая проблема"],
        "Сопутствующая цель": ["Сопутствующая цель"],
        "Главный критерий успеха": ["Главный критерий успеха"],
        "Критерий успеха": ["Критерий успеха"],
        "Критерий завершения": ["Критерий завершения"],
        "Условия реализации": ["Условия реализации"],
        "Цель": ["Цель"],
        "Основная цель": ["Основная цель"],
        "Возможность": ["Возможность"]

    },
    dataTable: [{
        parentColor: 'yellow lighten-4',
        name: "objectives",
        // title: "Связки",
        // tooltip: '<b>Связки</b> - это соотношение источника, группы, площадки и воркера на заданный период, для построения финальных отчетов',
        // tooltipIcon: mdiHelpCircleOutline,
        table: [],
        icon: 'mdi-vector-triangle',
        headers: [],
        multi: false,
        add: {
            title: "Добавление цели",
            titleEdit: "Редактирование цели",
            name: "add_objectives",
            data: [
                {
                    type: "text",
                    title: "Название",
                    name: "title",
                    placeholder: "",
                    model: null,
                    items: [],
                    block: true,
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
                //     filter: false,
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
                    type: "select",
                    title: "Проект",
                    name: "id_project",
                    placeholder: "",
                    model: null,
                    filter: true,
                    required: true,
                    tooltip: `Вы можете выбрать проект для этой цели или добавить цели прямо из проекта`,
                    tooltipIcon: mdiHelpCircleOutline,
                    // addTempItemIcon: 'mdi-plus-thick',
                    // addTempData: catalogsParam.dataTable[0].add.data,
                    itemText: 'title',
                },
                {
                    type: "select",
                    title: "Статус",
                    name: "id_status_objective",
                    placeholder: "",
                    disabled: false,
                    model: null,
                    required: true,
                    // tooltip: `Вы можете создать статусы прямо отсюда, нажам на кнопку <b>+</b>, или перейти в <a href="/settings/catalogs" target="_blank">справчоники</a> и создать там`,
                    // tooltipIcon: mdiHelpCircleOutline,
                    // addTempItemIcon: 'mdi-plus-thick',
                    // addTempData: catalogsParam.dataTable[0].add.data,
                    itemText: 'title',
                },
                {
                    type: "select",
                    title: "Тип цели",
                    name: "id_type_objective",
                    placeholder: "",
                    model: null,
                    required: true,
                    filter: true,
                    // tooltip: `Вы можете выбрать проект для этой цели или добавить цели прямо из проекта`,
                    // tooltipIcon: mdiHelpCircleOutline,
                    // addTempItemIcon: 'mdi-plus-thick',
                    // addTempData: catalogsParam.dataTable[0].add.data,
                    itemText: 'title',
                },
                {
                    type: "select",
                    title: "Цель-родитель",
                    name: "id_parent_objective",
                    placeholder: "",
                    model: null,
                    item_disabled: [],
                    required: false,
                    tooltip: `Вы можете выбрать цель-родетля для иерархической структуры целей проекта`,
                    tooltipIcon: mdiHelpCircleOutline,
                    // addTempItemIcon: 'mdi-plus-thick',
                    // addTempData: catalogsParam.dataTable[0].add.data,
                    itemText: 'title',
                },

            ],
        },
    }],
}