var orders = [
    {
      id: 1,
      specialistId: 11,
      customerId: 11,
      title: 'Уборка помещений',
      jobDescription: 'Генеральная уборка квартиры площадью 40 кв.м.',
      price: 2500,
      address: 'ул. Ленина, д. 10',
      date: '05.05.2025',
      time: '15:00',
      status: 'canceled'
    },
    {
      id: 2,
      specialistId: 11,
      customerId: 11,
      title: 'Услуги сантехника',
      jobDescription: 'Замена сантехники и плитки',
      price: 10000,
      address: 'ул. Гагарина, д. 5',
      date: '06.05.2025',
      time: '10:00',
      status: 'inprogress'
    },
    {
      id: 3,
      specialistId: 11,
      customerId: 22,
      title: 'Перевозка',
      jobDescription: 'Доставка продуктов из магазина',
      price: 150,
      address: 'ул. Пушкина, д. 15',
      date: '04.05.2025',
      time: '12:00',
      status: 'completed'
    },
    {
      id: 4,
      specialistId: 11,
      customerId: 22,
      title: 'Химчистка',
      jobDescription: 'Химчистка дивана',
      price: 3500,
      address: 'ул. Пушкина, д. 15',
      date: '07.05.2025',
      time: '12:00',
      status: 'new'
    },
    {
      id: 5,
      specialistId: 22,
      customerId: 22,
      title: 'Благоустройство',
      jobDescription: 'Усадка газона',
      price: 3000,
      address: 'ул. Пушкина, д. 15',
      date: '07.05.2025',
      time: '12:00',
      status: 'new'
    }
];

module.exports = orders;