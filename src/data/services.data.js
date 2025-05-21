var services = [
    {
      id: 1,
      specialistId: 22,
      title: 'Услуги сантехника',
      photos: ['assets/man.jpg', 'assets/2.jpg', 'assets/3.jpg'],
      location: 'г. Москва',
      works: [
        { name: 'Устранение засора', price: 1500 },
        { name: 'Замена смесителя', price: 1200 },
        { name: 'Установка раковины', price: 2500 }
      ]
    },
    {
      id: 2,
      specialistId: 33,
      title: 'Ремонт и обслуживание автомобилей',
      photos: ['assets/car1.jpg', 'assets/car2.jpg', 'assets/car3.jpg'],
      location: 'г. Новосибирск',
      works: [
        { name: 'Замена масла', price: 1500 },
        { name: 'Диагностика подвески', price: 1000 },
        { name: 'Ремонт двигателя', price: 8000 }
      ]
    },
    {
      id: 3,
      specialistId: 11,
      title: 'Уборка помещений',
      photos: ['assets/cleaning3.jpg', 'assets/cleaning2.jpg', 'assets/cleaning1.jpg'],
      location: 'г. Москва',
      works: [
        { name: 'Уборка квартиры (1-комн.)', price: 2000 },
        { name: 'Уборка офиса (до 50 м²)', price: 2500 },
        { name: 'Мытьё окон', price: 500 }
      ]
    },
    {
      id: 4,
      specialistId: 33,
      title: 'Химчистка',
      photos: ['assets/dryclean1.jpg', 'assets/dryclean2.jpg'],
      location: 'г. Санкт-Петербург',
      works: [
        { name: 'Химчистка дивана', price: 3500 },
        { name: 'Чистка ковра (до 5 м²)', price: 2000 },
        { name: 'Химчистка салона авто', price: 4000 }
      ]
    },
    {
      id: 5,
      specialistId: 22,
      title: 'Услуги электрика',
      photos: ['assets/electrician1.jpg', 'assets/electrician2.jpg'],
      location: 'г. Екатеринбург',
      works: [
        { name: 'Замена розетки', price: 500 },
        { name: 'Установка люстры', price: 1000 },
        { name: 'Ремонт электропроводки', price: 3000 }
      ]
    },
    {
      id: 6,
      specialistId: 33,
      title: 'Ремонт бытовой техники',
      photos: ['assets/appliance1.jpg', 'assets/appliance2.jpg'],
      location: 'г. Казань',
      works: [
        { name: 'Ремонт стиральной машины', price: 2500 },
        { name: 'Замена уплотнителя холодильника', price: 1800 },
        { name: 'Чистка посудомоечной машины', price: 1200 }
      ]
    },
    {
      id: 7,
      specialistId: 22,
      title: 'Благоустройство',
      photos: ['assets/landscaping2.jpg'],
      works: [
        { name: 'Укладка газона', price: 3000 },
        { name: 'Установка беседки', price: 15000 },
        { name: 'Мощение дорожек', price: 2000 }
      ]
    },
    {
      id: 8,
      specialistId: 11,
      title: 'Благоустройство',
      photos: ['assets/landscaping1.jpg', 'assets/landscaping2.jpg'],
      location: 'г. Москва',
      works: [
        { name: 'Укладка газона', price: 3000 },
        { name: 'Установка беседки', price: 15000 },
        { name: 'Мощение дорожек', price: 2000 }
      ]
    },
    {
      id: 9,
      specialistId: 33,
      title: 'Перевозка',
      photos: ['assets/delivery1.jpg', 'assets/delivery2.jpg'],
      location: 'г. Воронеж',
      works: [
        { name: 'Переезд квартиры (1-комн.)', price: 5000 },
        { name: 'Доставка стройматериалов', price: 2500 },
        { name: 'Вывоз мусора', price: 3000 }
      ]
    },
    {
      id: 10,
      specialistId: 22,
      title: 'Организация мероприятий',
      photos: ['assets/event1.jpg', 'assets/event2.jpg', 'assets/event3.jpg'],
      location: 'г. Сочи',
      works: [
        { name: 'Организация свадьбы', price: 50000 },
        { name: 'Корпоратив на 50 человек', price: 30000 },
        { name: 'Детский праздник', price: 15000 }
      ]
    }
];

module.exports = services;