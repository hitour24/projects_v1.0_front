import { mdiCheckDecagramOutline, mdiImageFilterCenterFocusStrongOutline } from '@mdi/js';
export default {
    loadCatalog: false,
    sectionMoreCatalog: {},
    selectMoreCatalog: {},
    dataTable: [
        {
            name: "statuses_projects",
            title: "Статусы проекта",
            // tooltip: '<b>Связки</b> - это соотношение источника, группы, площадки и воркера на заданный период, для построения финальных отчетов',
            // tooltipIcon: mdiHelpCircleOutline,
            table: [],
            icon: mdiCheckDecagramOutline,
            headers: [],
            multi: true,
            add: {
                title: "Добавление статуса проекта",
                titleEdit: "Редактирование статуса проекта",
                name: "add_status_project",
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
                        block: true,
                    },
                    {
                        type: "textarea",
                        title: "Описание",
                        name: "description",
                        placeholder: "",
                        model: null,
                        items: [],
                        filter: false,
                        required: false,
                        block: true,
                    },
                ]
            }
        },
        {
            name: "statuses_products",
            title: "Статусы продукта",
            // tooltip: '<b>Связки</b> - это соотношение источника, группы, площадки и воркера на заданный период, для построения финальных отчетов',
            // tooltipIcon: mdiHelpCircleOutline,
            table: [],
            icon: mdiCheckDecagramOutline,
            headers: [],
            multi: true,
            add: {
                title: "Добавление статуса продукта",
                titleEdit: "Редактирование статуса продукта",
                name: "add_status_product",
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
                        block: true,
                    },
                    {
                        type: "textarea",
                        title: "Описание",
                        name: "description",
                        placeholder: "",
                        model: null,
                        items: [],
                        filter: false,
                        required: false,
                        block: true,
                    },
                ]
            }
        },
        {
            name: "statuses_objectives",
            title: "Статусы цели",
            // tooltip: '<b>Связки</b> - это соотношение источника, группы, площадки и воркера на заданный период, для построения финальных отчетов',
            // tooltipIcon: mdiHelpCircleOutline,
            table: [],
            icon: mdiCheckDecagramOutline,
            headers: [],
            multi: true,
            add: {
                title: "Добавление статуса цели",
                titleEdit: "Редактирование статуса цели",
                name: "add_status_objective",
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
                        block: true,
                    },
                    {
                        type: "textarea",
                        title: "Описание",
                        name: "description",
                        placeholder: "",
                        model: null,
                        items: [],
                        filter: false,
                        required: false,
                        block: true,
                    },
                ]
            }
        },
        {
            name: "roles",
            title: "Роли системы",
            // tooltip: '<b>Связки</b> - это соотношение источника, группы, площадки и воркера на заданный период, для построения финальных отчетов',
            // tooltipIcon: mdiHelpCircleOutline,
            table: [],
            icon: 'mdi-shield-account-outline',
            headers: [],
            multi: true,
            add: {
                title: "Добавление роли",
                titleEdit: "Редактирование роли",
                name: "add_roles",
                data: [
                    {
                        type: "text",
                        title: "Имя",
                        name: "name",
                        placeholder: "",
                        model: null,
                        items: [],
                        filter: true,
                        required: true,
                        block: true,
                    },
                    {
                        type: "text",
                        title: "Название",
                        name: "title",
                        placeholder: "",
                        model: null,
                        items: [],
                        filter: true,
                        required: true,
                        block: true,
                    },
                    {
                        type: "textarea",
                        title: "Описание",
                        name: "description",
                        placeholder: "",
                        model: null,
                        items: [],
                        filter: false,
                        required: false,
                        block: true,
                    },
                ]
            }
        },
        {
            name: "roles_project",
            title: "Роли проектов",
            // tooltip: '<b>Связки</b> - это соотношение источника, группы, площадки и воркера на заданный период, для построения финальных отчетов',
            // tooltipIcon: mdiHelpCircleOutline,
            table: [],
            icon: 'mdi-briefcase-account-outline',
            headers: [],
            multi: true,
            add: {
                title: "Добавление роли проекта",
                titleEdit: "Редактирование роли проекта",
                name: "add_roles_project",
                data: [
                    {
                        type: "text",
                        title: "Имя",
                        name: "name",
                        placeholder: "",
                        model: null,
                        items: [],
                        filter: true,
                        required: true,
                        block: true,
                    },
                    {
                        type: "text",
                        title: "Название",
                        name: "title",
                        placeholder: "",
                        model: null,
                        items: [],
                        filter: true,
                        required: true,
                        block: true,
                    },
                    {
                        type: "textarea",
                        title: "Описание",
                        name: "description",
                        placeholder: "",
                        model: null,
                        items: [],
                        filter: false,
                        required: false,
                        block: true,
                    },
                ]
            }
        },
        {
            name: "type_objective",
            title: "Типы целей",
            // tooltip: '<b>Связки</b> - это соотношение источника, группы, площадки и воркера на заданный период, для построения финальных отчетов',
            // tooltipIcon: mdiHelpCircleOutline,
            table: [],
            icon: mdiImageFilterCenterFocusStrongOutline,
            headers: [],
            multi: true,
            add: {
                title: "Добавление статуса цели",
                titleEdit: "Редактирование статуса цели",
                name: "add_type_objective",
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
                        block: true,
                    },
                    {
                        type: "textarea",
                        title: "Описание",
                        name: "description",
                        placeholder: "",
                        model: null,
                        items: [],
                        filter: false,
                        required: false,
                        block: true,
                    },
                ]
            }
        }
    ]
}