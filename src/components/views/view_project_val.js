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
            data: {
                name: 'id_custom',
                model: null,
            }
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
                    title: 'Рабочая папка проекта',
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
            color: 'red lighten-3',
            name: 'objectives_0',
            name_types: '',
            block: '12',
            extra: { type_objective: null, statuses_objectives: null },
            description: 'Главная проблема, которую решает проект для бизнеса',
            edit: true,
            data: []
        },

        {
            type: 'list',
            hierarchy: 2,
            start_sub_hierarchy: 0,
            color: 'yellow lighten-3',
            name: 'objectives_1',
            name_types: '',
            block: '12',
            extra: { type_objective: null, statuses_objectives: null },
            description: 'и/или Главная цель проекта',
            edit: true,
            data: []
        },

        {
            type: 'list',
            hierarchy: 1,
            start_sub_hierarchy: 1,
            color: 'red lighten-4',
            name: 'objectives_2',
            name_types: '',
            block: '12',
            extra: { type_objective: null, statuses_objectives: null },
            description: 'Проблемы',
            edit: true,
            data: []
        },

        {
            type: 'list',
            hierarchy: 2,
            start_sub_hierarchy: 1,
            color: 'yellow lighten-4',
            name: 'objectives_3',
            name_types: '',
            block: '12',
            extra: { type_objective: null, statuses_objectives: null },
            description: 'Цели',
            edit: true,
            data: []
        },
        {
            type: 'list',
            hierarchy: 3,
            start_sub_hierarchy: 1,
            color: 'green lighten-5',
            name: 'objectives_4',
            name_types: '',
            block: '12',
            extra: { type_objective: null, statuses_objectives: null },
            description: 'Возможности',
            edit: true,
            data: []
        },
        {
            type: 'list',
            hierarchy: 4,
            start_sub_hierarchy: 1,
            color: 'teal lighten-4',
            name: 'objectives_5',
            name_types: '',
            block: '12',
            extra: { type_objective: null, statuses_objectives: null },
            description: 'Способности',
            edit: true,
            data: []
        },
        {
            type: 'list',
            hierarchy: 5,
            start_sub_hierarchy: 1,
            color: 'grey lighten-4',
            name: 'solutions_0',
            name_types: '',
            extra: {},
            block: '12',
            description: 'Варианты решения проблемы. Обоснуйте свой выбор стратегии решения проблемы',
            edit: true,
            data: []
        },

        {
            type: 'list',
            hierarchy: 6,
            start_sub_hierarchy: 1,
            color: 'blue lighten-5',
            name: 'products_0',
            name_types: '',
            block: '12',
            extra: { statuses_products: null },
            description: 'Продукты',
            edit: true,
            data: []
        },

        {
            type: 'list',
            hierarchy: 7,
            start_sub_hierarchy: 1,
            color: 'orange lighten-4',
            name: 'objectives_6',
            name_types: '',
            block: '12',
            extra: { type_objective: null, statuses_objectives: null },
            description: 'Критерии успеха. Опишите способ сбора исходных данных для показателя, источники данных. Как вы сможете проверить качество данных?',
            edit: true,
            data: []
        },

        {
            type: 'list',
            hierarchy: 8,
            start_sub_hierarchy: 1,
            color: 'light-blue lighten-5',
            name: 'objectives_7',
            name_types: '',
            block: '12',
            extra: { type_objective: null, statuses_objectives: null },
            description: 'Условия реализации проекта',
            edit: true,
            data: []
        }


    ],

}