import { mdiHelpCircleOutline } from "@mdi/js";
import catalogsParam from './../settings/catalogs/params';
export default {
    
    dataTable: [{
        name: "projects",
        // title: "Связки",
        // tooltip: '<b>Связки</b> - это соотношение источника, группы, площадки и воркера на заданный период, для построения финальных отчетов',
        // tooltipIcon: mdiHelpCircleOutline,
        table: [],
        icon: 'mdi-vector-triangle',
        headers: [],
        multi: true,
        add: {
            title: "Добавление проекта",
            titleEdit: "Редактирование проекта",
            name: "add_project",
            data: [
                {
                    type: "text",
                    title: "ID",
                    name: "id",
                    placeholder: "",
                    model: null,
                    items: [],
                    filter: true,
                    required: true,

                },
                {
                    type: "text",
                    title: "Название",
                    name: "title",
                    placeholder: "Например: Запуск ПЛ Север",
                    model: null,
                    items: [],
                    filter: true,
                    required: true,

                },
                {
                    type: "select",
                    title: "Статус",
                    name: "id_status_project",
                    placeholder: "",
                    model: null,
                    required: true,
                    tooltip: `Вы можете создать статусы прямо отсюда, нажам на кнопку <b>+</b>, или перейти в <a href="/settings/catalogs" target="_blank">справчоники</a> и создать там`,
                    tooltipIcon: mdiHelpCircleOutline,
                    addTempItemIcon: 'mdi-plus-thick',
                    addTempData: catalogsParam.dataTable[0].add.data,
                    itemText: 'title',
                },
                {
                    type: "select",
                    title: "Цели",
                    name: "objectives",
                    placeholder: "",
                    model: null,
                    required: false,
                    multi: true,
                    tooltip: `Вы можете создать цели прямо отсюда, нажам на кнопку <b>+</b>, или перейти в <a href="/objectives" target="_blank">цели</a> и создать там`,
                    tooltipIcon: mdiHelpCircleOutline,

                    addTempItemIcon: 'mdi-plus-thick',
                    addTempData: [],
                    itemText: 'title',
                    // enabled: "id_month",
                },
                {
                    type: "select",
                    title: "Продукты",
                    name: "products",
                    placeholder: "",
                    model: null,
                    required: false,
                    multi: true,
                    tooltip: `Вы можете создать продукты прямо отсюда, нажам на кнопку <b>+</b>, или перейти в <a href="/products" target="_blank">продукты</a> и создать там`,
                    tooltipIcon: mdiHelpCircleOutline,
                    addTempItemIcon: 'mdi-plus-thick',
                    addTempData: [],
                    itemText: 'title',
                    // enabled: "id_month",
                },
                {
                    type: "select",
                    title: "Участники",
                    name: "members",
                    placeholder: "",
                    model: null,
                    required: false,
                    multi: true,
                    tooltip: `Вы можете создать участников прямо отсюда, нажам на кнопку <b>+</b>, или перейти в <a href="/members" target="_blank">участники</a> и создать там`,
                    tooltipIcon: mdiHelpCircleOutline,
                    addTempItemIcon: 'mdi-plus-thick',
                    addTempData: [],
                    itemText: 'title',
                    block: true,
                    // enabled: "id_month",
                },
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
                    type: "text",
                    title: "Варианты решения проблемы",
                    name: "solution_options",
                    placeholder: "",
                    model: null,
                    items: [],
                    filter: false,
                    block: true,
                    required: false,
                },
                {
                    type: "text",
                    title: "Обоснование вариантов",
                    name: "rationale_option",
                    placeholder: "",
                    model: null,
                    items: [],
                    filter: false,
                    block: true,
                    required: false,
                },
                {
                    type: "text",
                    title: "Иерархия продуктов (PBS)",
                    name: "pbs",
                    placeholder: "",
                    model: null,
                    required: false,
                },
                {
                    type: "text",
                    title: "Ссылка на план проекта (WBS)",
                    name: "wbs",
                    placeholder: "",
                    model: null,
                    required: false,
                },
                {
                    type: "text",
                    title: "Ресурсы (ссылка на ресурсный план) ",
                    name: "resources",
                    placeholder: "",
                    model: null,
                    filter: false,
                    required: false,
                    // enabled: "id_month",
                },
                {
                    type: "text",
                    title: "Учет рисков, возможностей, проблем",
                    name: "risks",
                    placeholder: "",
                    model: null,
                    required: false,
                    // enabled: "id_month",
                },

                {
                    type: "checkbox",
                    title: "Проработана цель и продукты проекта",
                    name: "products_objectives",
                    placeholder: "",
                    model: null,
                    required: false,
                    // enabled: "id_month",
                },
                {
                    type: "checkbox",
                    title: "Утвержден план задач (WBS)",
                    name: "task_plan",
                    placeholder: "",
                    model: null,
                    required: false,
                    // enabled: "id_month",
                },
                {
                    type: "checkbox",
                    title: "Есть РП, есть команда, есть время",
                    name: "rp_command_time",
                    placeholder: "",
                    model: null,
                    required: false,
                    // enabled: "id_month",
                },
                {
                    type: "checkbox",
                    title: "Освобождены ресурсы РП для проекта",
                    name: "rp_resource",
                    placeholder: "",
                    model: null,
                    required: false,
                    // enabled: "id_month",
                },
                {
                    type: "checkbox",
                    title: "Проекты выведен в реализацию (2 недели стартового трекинга",
                    name: "start_realization",
                    placeholder: "",
                    model: null,
                    required: false,
                    // enabled: "id_month",
                },
                {
                    type: "date",
                    title: "Инициирован",
                    name: "date_initiation",
                    placeholder: "",
                    model: null,
                    required: false,
                    // enabled: "id_month",
                },
                {
                    type: "date",
                    title: "Старт",
                    name: "date_start",
                    placeholder: "",
                    model: null,
                    required: false,
                    // enabled: "id_month",
                },
                {
                    type: "date",
                    title: "Завершен (принят)",
                    name: "date_completion",
                    placeholder: "",
                    model: null,
                    required: false,
                    // enabled: "id_month",
                },
                {
                    type: "date",
                    title: "Заморожен",
                    name: "date_frozen",
                    placeholder: "",
                    model: null,
                    required: false,
                    // enabled: "id_month",
                },
                {
                    type: "date",
                    title: "Успешен",
                    name: "date_success",
                    placeholder: "",
                    model: null,
                    required: false,
                    // enabled: "id_month",
                },
                {
                    type: "checkbox",
                    title: "Бизнес-модель и УТП: Требования + HR + доп.сервисы",
                    name: "requirements_hr_addit_services",
                    placeholder: "",
                    model: null,
                    required: false,
                    // enabled: "id_month",
                },
                {
                    type: "checkbox",
                    title: "Жизненно-необходимые проекты",
                    name: "vital",
                    placeholder: "",
                    model: null,
                    required: false,
                    // enabled: "id_month",
                },
            ],
        },
    }],
}