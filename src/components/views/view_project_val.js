import { mdiMinusThick } from "@mdi/js";
export default {
    testVar: 1,
    loadingStartEdit: false,
    currentIdProject: null,
    itemsSub: [],
    dialogAddMember: false,
    dialogAddMemberData: {},
    optionGoTo: {
        duration: 370,
        offset: 80,
    },
    icons: {
        minus: mdiMinusThick
    },
    mode: 'view', // view / rdir 
    loadSubCatalog: false,
    loadViewProject: false,
    personalData: { name: { title: 'Имя', model: '', required: true, }, sername: { title: 'Фамилия', model: '', required: true, }, secondname: { title: 'Отчество', model: '', required: true, } },
    allProjects: [
        {
            id: 1,
            title: 'Система управления',
            description: 'Система описания',
        }
    ],
    currentProject: {
        id: 1,
        title: 'Система управления',
        description: 'Система описания',
    },
    extra: {

    },
    formProject: [
        {
            type: 'head_select',
            name: 'title',
            title: 'Проект',
            text: null,
            model: null,
            items: [],
            block: '12',
        },
        {
            type: 'textarea',
            name: 'description',
            title: 'Описание проекта',
            model: '',
            block: '12',
        },
        {
            type: 'label_input_block',
            name: 'members',
            block: '12',
            extra: { roles_project: null },
            edit: true,
            data: [
                {
                    type: 'select',
                    roleProject: 'project_manager',
                    project_worker: 'project_manager',
                    name: 'userauth_0',
                    title: 'Руководитель',
                    addTempItemIcon: 'mdi-plus-thick',
                    model: null,//{ name: { title: 'Имя', model: '', required: true, }, sername: { title: 'Фамилия', model: '', required: true, }, secondname: { title: 'Отчество', model: '', }, contacts: { title: 'Контакты', model: '', }, id_project: { title: 'Проект', model: '', disabled: true }, id: { title: 'Проект', model: '', disabled: true } },
                    //get value() { return `${this.model.name.model}${this.model.sername.model ? ' ' + this.model.sername.model : ''}` },
                    required: true,
                    block: '2',
                    itemText: (e) => `${e.name} ${e.sername}`,
                    itemValue: (u) => u,//`${{ id: null, id_project: null, id_role_project: null, id_user: u.id }}`,
                    member: true,
                    returnObject: true,
                    modalAddNew: false,
                    formMember: false,
                },
                {
                    type: 'select',
                    roleProject: 'member',
                    project_worker: 'analyst',
                    name: 'userauth_1',
                    title: 'Аналитик',
                    addTempItemIcon: 'mdi-plus-thick',
                    model: null,//{ name: { title: 'Имя', model: '', required: true, }, sername: { title: 'Фамилия', model: '', required: true, }, secondname: { title: 'Отчество', model: '', }, contacts: { title: 'Контакты', model: '', }, id_project: { title: 'Проект', model: '', disabled: true }, id: { title: 'Проект', model: '', disabled: true } },
                    //get value() { return `${this.model.name.model}${this.model.sername.model ? ' ' + this.model.sername.model : ''}` },
                    required: false,
                    block: '2',
                    member: true,
                    itemText: (e) => `${e.name} ${e.sername}`,
                    itemValue: (u) => u,///`${{ id: null, id_project: null, id_role_project: null, id_user: u.id }}`,
                    returnObject: true,
                    modalAddNew: false,
                    formMember: false,
                },
                {
                    type: 'select',
                    roleProject: 'member',
                    project_worker: 'developer',
                    name: 'userauth_2',
                    title: 'Разработчик',
                    addTempItemIcon: 'mdi-plus-thick',
                    model: null,//{ name: { title: 'Имя', model: '', required: true, }, sername: { title: 'Фамилия', model: '', required: true, }, secondname: { title: 'Отчество', model: '', }, contacts: { title: 'Контакты', model: '', }, id_project: { title: 'Проект', model: '', disabled: true }, id: { title: 'Проект', model: '', disabled: true } },
                    // get value() { return `${this.model.name.model}${this.model.sername.model ? ' ' + this.model.sername.model : ''}` },
                    required: false,
                    block: '2',
                    member: true,
                    itemText: (e) => `${e.name} ${e.sername}`,
                    itemValue: (u) => u,//`${{ id: null, id_project: null, id_role_project: null, id_user: u.id }}`,
                    returnObject: true,
                    modalAddNew: false,
                    formMember: false,
                },
                {
                    type: 'select',
                    name: 'userauth_3',
                    project_worker: 'members',
                    roleProject: 'member',
                    title: 'Участники',
                    addTempItemIcon: 'mdi-plus-thick',
                    model: [],
                    multi: true,
                    // required: true,
                    // get value() { return [dataThis[0].model] },
                    itemText: (e) => `${e.name} ${e.sername}`,
                    itemValue: (u) => u,//`${{ id: null, id_project: null, id_role_project: null, id_user: e.id }}`,
                    block: '',
                    modalAddNew: false,
                    formMember: false,
                }
            ]

        },
        {
            type: 'label_input_block',
            name: 'common',
            block: '12',
            edit: true,
            data: [
                {
                    type: 'text',
                    name: 'pbs',
                    title: 'Иерархия продуктов (PBS)',
                    model: '',
                    block: '2'
                },
                {
                    type: 'text',
                    name: 'wbs',
                    title: 'Ссылка на план проекта (WBS)',
                    model: '',
                    block: '2'
                },
                {
                    type: 'text',
                    name: 'resources',
                    title: 'Ресурсы (ссылка на ресурсный план)',
                    model: '',
                    block: '3'
                },
                {
                    type: 'text',
                    name: 'risks',
                    title: 'Учет рисков, возможностей, проблем',
                    model: '',
                    block: '3'
                },
                {
                    type: 'select',
                    name: 'id_status_project',
                    title: 'Статус',
                    items: [],
                    model: null,
                    block: '2',
                    itemText: 'title',
                    itemValue: 'id',
                    required: true,
                }
            ]
        },
        {
            type: 'label_input_block',
            name: 'common_bool',
            block: '12',
            edit: true,
            data: [
                {
                    type: 'checkbox',
                    name: 'products_objectives',
                    title: 'Проработана цель и продукты проекта',
                    model: false,
                    block: '3'
                },
                {
                    type: 'checkbox',
                    name: 'task_plan',
                    title: 'Утвержден план задач (WBS)',
                    model: false,
                    block: '3'
                },
                {
                    type: 'checkbox',
                    name: 'rp_command_time',
                    title: 'Есть РП, есть команда, есть время',
                    model: false,
                    block: '3'
                },
                {
                    type: 'checkbox',
                    name: 'start_realization',
                    title: 'Проекты выведен в реализацию (2 недели стартового трекинга',
                    model: false,
                    block: '3'
                },]
        },
        {
            type: 'label_input_block',
            name: 'common_date',
            block: '12',
            edit: true,
            data: [
                {
                    type: 'date',
                    name: 'date_initiation',
                    title: 'Инициирован - дата',
                    model: null,
                    block: '3'
                },
                {
                    type: 'date',
                    name: 'date_start',
                    title: 'Старт - дата',
                    model: null,
                    block: '2'
                },
                {
                    type: 'date',
                    name: 'date_completion',
                    title: 'Завершен (принят) - дата',
                    model: null,
                    block: '3'
                },
                {
                    type: 'date',
                    name: 'date_frozen',
                    title: 'Заморожен - дата',
                    model: null,
                    block: '2'
                },
                {
                    type: 'date',
                    name: 'date_success',
                    title: 'Успешен - дата',
                    model: null,
                    block: '2'
                }
            ]

        },
        // {
        //     type: 'caption',
        //     name: 'n_',
        //     title: '№ в иерархии'
        // },
        {
            type: 'list',
            hierarchy: 1,
            start_sub_hierarchy: 0,
            color: 'red lighten-4',
            name: 'objectives_0',
            name_types: '',
            block: '12',
            extra: { type_objective: null, statuses_objectives: null },
            description: 'Зачем проект инициировали (Обоснование выполнения проекта) - главная проблема, которую решает проект для бизнеса',
            edit: true,
            data: [
                // {
                //     id: 1,
                //     title: 'Основная проблема',
                //     description: 'Репутационные сбои из-за перебоев с материалами на объектах, доп.траты на срочные доставки, дорогостоящий большой склад под хранение редкоиспользуемых запасов, расходы на покупку '
                // },
                // {
                //     id: 2,
                //     title: 'Основная 1',
                //     description: 'Проблема: Наличие частых ситуаций отсутствия ТМЦ на объектах (в т.ч. критически важных для процесса обслуживания: туалетной бумаги, полотенец, дез.средств), что сказывается на качестве, на '
                // },
                // {
                //     id: 3,
                //     title: 'Основная 2',
                //     description: 'Проблема: Наличие частых ситуаций отсутствия ТМЦ на объектах (в т.ч. критически важных для процесса обслуживания: туалетной бумаги, полотенец, дез.средств), что сказывается на качестве, на.  '
                // }
            ]
        },
        {
            type: 'list',
            hierarchy: 2,
            start_sub_hierarchy: 1,
            color: 'red lighten-4',
            name: 'objectives_4',
            name_types: '',
            block: '12',
            extra: { type_objective: null, statuses_objectives: null },
            description: 'Цели проекта',
            edit: true,
            data: []

        },
        {
            type: 'list',
            hierarchy: 3,
            start_sub_hierarchy: 1,
            color: 'yellow lighten-4',
            name: 'objectives_1',
            name_types: '',
            block: '12',
            extra: { type_objective: null, statuses_objectives: null },
            description: 'Дополнительные проблемы, на решение которых может повлиять реализация вашего проекта',
            edit: true,
            data: [
                // {
                //     id: 1,
                //     title: 'Сопутствующая проблема 1',
                //     description: 'Повышение качества обучения менеджеров (они учатся следить за ТМЦ, разбираться в них, планировать) '
                // },
                // {
                //     id: 2,
                //     title: 'Сопутствующая проблема 2',
                //     description: 'Выявление дополнительные проблем на объектах и их оперативное решение (к примеру, перерасход химии или недостача по форме) '
                // },
                // {
                //     id: 3,
                //     title: 'Сопутствующая проблема 3',
                //     description: 'Улучшение фин планирования для крупных закупок '
                // }
            ]
        },
        {
            type: 'list',
            hierarchy: 4,
            start_sub_hierarchy: 1,
            color: 'blue lighten-5',
            name: 'products_0',
            name_types: '',
            block: '12',
            extra: { statuses_products: null },
            description: 'Главный Продукт в результате проекта?',
            edit: true,
            data: [
                // {
                //     id: 1,
                //     title: 'Главный продукт',
                //     description: 'Бизнес процесс Управление запасами  '
                // },
            ]
        },
        {
            type: 'list',
            hierarchy: 5,
            start_sub_hierarchy: 1,
            color: 'grey lighten-5',
            name: 'products_1',
            name_types: '',
            block: '12',
            extra: { statuses_products: null },
            description: 'Основные продукты проекта',
            edit: true,
            data: [
                // {
                //     id: 1,
                //     title: 'Основной продукт 1',
                //     description: 'автоматизированная заявка на расходники;'
                // },
                // {
                //     id: 2,
                //     title: 'Основной продукт 2',
                //     description: 'актуальная база ТМЦ по всем объетам;'
                // },
                // {
                //     id: 3,
                //     title: 'Основной продукт 3',
                //     description: 'технологические карты;'
                // },
                // {
                //     id: 4,
                //     title: 'Основной продукт 4',
                //     description: 'БП "заказ со склада"'
                // },
            ]
        },

        {
            type: 'list',
            hierarchy: 6,
            start_sub_hierarchy: 1,
            color: 'yellow lighten-4',
            name: 'objectives_2',
            name_types: '',
            block: '12',
            extra: { type_objective: null, statuses_objectives: null },
            description: 'Главный критерий успеха. Опишите способ сбора исходных данных для показателя, источники данных. Как вы сможете проверить качество данных?',
            edit: true,
            data: [
                // {
                //     id: 1,
                //     title: 'Основной продукт 1',
                //     description: 'автоматизированная заявка на расходники;'
                // },
                // {
                //     id: 2,
                //     title: 'Основной продукт 2',
                //     description: 'актуальная база ТМЦ по всем объетам;'
                // },
                // {
                //     id: 3,
                //     title: 'Основной продукт 3',
                //     description: 'технологические карты;'
                // },
                // {
                //     id: 4,
                //     title: 'Основной продукт 4',
                //     description: 'БП "заказ со склада"'
                // },
            ]
        },

        {
            type: 'list',
            hierarchy: 7,
            start_sub_hierarchy: 1,
            color: 'deep-purple lighten-5',
            name: 'objectives_3',
            name_types: '',
            block: '12',
            extra: { type_objective: null, statuses_objectives: null },
            description: 'Вторичные критерии успеха',
            edit: true,
            data: [
                // {
                //     id: 1,
                //     title: 'Основной продукт 1',
                //     description: 'автоматизированная заявка на расходники;'
                // },
                // {
                //     id: 2,
                //     title: 'Основной продукт 2',
                //     description: 'актуальная база ТМЦ по всем объетам;'
                // },
                // {
                //     id: 3,
                //     title: 'Основной продукт 3',
                //     description: 'технологические карты;'
                // },
                // {
                //     id: 4,
                //     title: 'Основной продукт 4',
                //     description: 'БП "заказ со склада"'
                // },
            ]
        },

        // {
        //     type: 'list',
        //     hierarchy: 7,
        //     start_sub_hierarchy: 1,
        //     color: 'red lighten-4',
        //     name: 'objectives_4',
        //     name_types: '',
        //     block: '12',
        //     extra: { type_objective: null, statuses_objectives: null },
        //     description: 'Критерий завершения проекта',
        //     edit: true,
        //     data: [
        //         // {
        //         //     id: 1,
        //         //     title: 'Основной продукт 1',
        //         //     description: 'автоматизированная заявка на расходники;'
        //         // },
        //         // {
        //         //     id: 2,
        //         //     title: 'Основной продукт 2',
        //         //     description: 'актуальная база ТМЦ по всем объетам;'
        //         // },
        //         // {
        //         //     id: 3,
        //         //     title: 'Основной продукт 3',
        //         //     description: 'технологические карты;'
        //         // },
        //         // {
        //         //     id: 4,
        //         //     title: 'Основной продукт 4',
        //         //     description: 'БП "заказ со склада"'
        //         // },
        //     ]
        // },

        {
            type: 'list',
            hierarchy: 8,
            start_sub_hierarchy: 1,
            color: 'light-blue lighten-5',
            name: 'objectives_5',
            name_types: '',
            block: '12',
            extra: { type_objective: null, statuses_objectives: null },
            description: 'Условия реализации проекта',
            edit: true,
            data: [
                // {
                //     id: 1,
                //     title: 'Основной продукт 1',
                //     description: 'автоматизированная заявка на расходники;'
                // },
                // {
                //     id: 2,
                //     title: 'Основной продукт 2',
                //     description: 'актуальная база ТМЦ по всем объетам;'
                // },
                // {
                //     id: 3,
                //     title: 'Основной продукт 3',
                //     description: 'технологические карты;'
                // },
                // {
                //     id: 4,
                //     title: 'Основной продукт 4',
                //     description: 'БП "заказ со склада"'
                // },
            ]
        }


    ],

}