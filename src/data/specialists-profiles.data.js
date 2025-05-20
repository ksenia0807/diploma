var specialistsProfiles = [
  {
    id: 22,
    avatar: ['assets/car2.jpg'],
    name: 'Иван',
    surname: 'Иванов',
    patronymic: 'Иванович',
    rating: 4.9,
    email: 'ivanov@example.com',
    phone: '+7 (999) 123-45-67',
    location: 'г. Москва',
    about: 'Профессиональный специалист с 10-летним опытом работы.',
    services: [
      {
        id: 1,
        title: 'Услуги сантехника',
        photos: ['assets/man.jpg', 'assets/2.jpg', 'assets/3.jpg'],
        location: 'г. Москва',
        works: [
          { name: 'Устранение засора', price: 1500 },
          { name: 'Замена смесителя', price: 1200 },
          { name: 'Установка раковины', price: 2500 }
        ]
      }
    ],
    login: 'ivan',
    password: 'ivan',
  },
  {
    id: 33,
    avatar: ['assets/car2.jpg'],
    name: 'Константин',
    surname: 'Горюшкин',
    patronymic: 'Денисович',
    rating: 3.8,
    email: 'konstGor@example.com',
    phone: '+7 (999) 123-45-67',
    location: 'г. Новосибирск',
    about: 'Опытный и надежный работник. Всегда готов помочь!',
    services: [],
    login: 'kostya',
    password: 'kostya',
  },
  {
    id: 11,
    avatar: ['assets/car2.jpg'],
    name: 'Алексей',
    surname: 'Власов',
    patronymic: 'Игоревич',
    rating: 5.0,
    email: 'jieha@example.com',
    phone: '+7 (999) 123-45-67',
    location: 'г. Москва',
    about: 'Мастер со стажем в 5 лет.',
    services: [
      {
        id: 1,
        title: 'Сборка мебели',
        works: [
          {
            name: 'Сборка кухни',
            price: 20000,
          },
          {
            name: 'Сборка шкафа',
            price: 3000,
          }
        ],
        location: 'Москва',
        photos: ['assets/car1.jpg', 'assets/car3.jpg', 'assets/car2.jpg'],
      }
    ],
    login: 'alex',
    password: 'alex',
  }
];

module.exports = specialistsProfiles;