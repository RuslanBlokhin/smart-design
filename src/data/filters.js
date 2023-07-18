export const filters = [
    {
        id: 'type-filter',
        title: 'ПО ТИПУ',
        options: [
            'Перьевые ручки',
            'Шариковые ручки',
            'Автоматические карандаши',
            'Мультисистемные  ручки',
            'Цифровое письмо',
            'Наборы',
        ],
    },
    {
        id: 'brand-filter',
        title: 'ПО БРЭНДУ',
        options: ['LAMY', 'TWSBI', 'J.Herbin', 'Rhodia', 'Sailor'],
    },
    {
        id: 'size-filter',
        title: 'ПО РАЗМЕРУ',
        options: ['L', 'M', 'S', 'A', 'B'],
    },
    {
        id: 'color-filter',
        title: 'ПО ЦВЕТУ',
        options: [
            { name: 'БЕЛЫЙ', color: '#fff', class: 'colors' },
            { name: 'СИНИЙ', color: '#372DA7', class: 'colors' },
            { name: 'КРАСНЫЙ', color: '#C21F46', class: 'colors' },
            { name: 'ЖЕЛТЫЙ', color: '#CCCF29', class: 'colors' },
            { name: 'КОРИЧНЕВЫЙ', color: '#9A6B49', class: 'colors' },
        ],
    },
];
