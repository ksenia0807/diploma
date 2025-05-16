const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_jwt_secret_key';

// Разрешаем CORS для Angular-приложения
app.use(cors());

// Для парсинга JSON в теле запросов
app.use(express.json());

const users = [
];

// Регистрация
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Пользователь уже существует' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.json({ message: 'Регистрация успешна' });
});

// Логин
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: 'Неверные данные' });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ message: 'Неверные данные' });

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Middleware для проверки токена
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Токен отсутствует' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Неверный токен' });
    req.user = user;
    next();
  });
}

// Защищённый маршрут
app.get('/api/profile', authenticateToken, (req, res) => {
  res.json({ message: `Привет, ${req.user.username}! Это защищённый профиль.` });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

const specialists = [
    {
      id: 1,
      title: 'Услуги сантехника',
      rating: 4.9,
      photos: ['assets/man.jpg', 'assets/2.jpg', 'assets/3.jpg', 'assets/man.jpg', 'assets/2.jpg', 'assets/3.jpg'],
      shortDescription: 'Я мастер с опытом работы более 8 лет, специализирующийся на установке и ремонте водопроводных и отопительных систем. Обеспечиваю качественное обслуживание и быстрое решение любых сантехнических проблем.',
      fullDescription: 'Я мастер с опытом работы более 8 лет, специализирующийся на установке и ремонте водопроводных и отопительных систем. Обеспечиваю качественное обслуживание и быстрое решение любых сантехнических проблем. Готов помочь вам с установкой, ремонтом и консультациями!',
      location: 'г. Москва',
      services: [
        { name: 'Установка смесителя', price: 1200 },
        { name: 'Ремонт трубы', price: 1500 },
        { name: 'Устранение засора', price: 1000 }
      ]
    },
    {
      id: 2,
      title: 'Ремонт автомобилей',
      rating: 4.7,
      photos: ['assets/car1.jpg', 'assets/car2.jpg', 'assets/car3.jpg'],
      shortDescription: 'Я мастер с опытом работы более 8 лет, специализирующийся на установке и ремонте водопроводных и отопительных систем. Обеспечиваю качественное обслуживание и быстрое решение любых сантехнических проблем.',
      fullDescription: 'Я мастер с опытом работы более 8 лет, специализирующийся на установке и ремонте водопроводных и отопительных систем. Обеспечиваю качественное обслуживание и быстрое решение любых сантехнических проблем. Готов помочь вам с установкой, ремонтом и консультациями!',
      location: 'г. Москва',
      services: [
        { name: 'Замена масла в коробке', price: 1200 },
        { name: 'Сход-развал', price: 1500 },
        { name: 'Замена колес', price: 1000 },
        { name: 'Полировка царапин', price: 1000 }
      ]
    },
    {
      id: 3,
      title: 'Ремонт автомобилей',
      rating: 4.5,
      photos: ['assets/car1.jpg', 'assets/car2.jpg', 'assets/car3.jpg'],
      shortDescription: 'Я мастер с опытом работы более 8 лет, специализирующийся на установке и ремонте водопроводных и отопительных систем. Обеспечиваю качественное обслуживание и быстрое решение любых сантехнических проблем.',
      fullDescription: 'Я мастер с опытом работы более 8 лет, специализирующийся на установке и ремонте водопроводных и отопительных систем. Обеспечиваю качественное обслуживание и быстрое решение любых сантехнических проблем. Готов помочь вам с установкой, ремонтом и консультациями!',
      location: 'г. Москва',
      services: [
        { name: 'Установка смесителя', price: 1200 },
        { name: 'Ремонт трубы', price: 1500 },
        { name: 'Устранение засора', price: 1000 }
      ]
    },
  ];

app.get('/api/specialists', (req, res) => {
  res.json(specialists);
});

var orders = [
    {
      id: 1,
      specialistId: 11,
      customerId: 11,
      title: 'Уборка двухкомнатной квартиры',
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
      title: 'Ремонт ванной комнаты',
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
      title: 'Доставка продуктов',
      jobDescription: 'Доставка продуктов из магазина',
      price: 150,
      address: 'ул. Пушкина, д. 15',
      date: '04.05.2025',
      time: '12:00',
      status: 'completed'
    }
];

app.get('/api/specialistsOrders', (req, res) => {
  res.json(orders);
});

var specialistsProfiles = [
  // {
  //   id: 22,
  //   avatar: ['assets/car2.jpg'],
  //   name: 'Иван',
  //   surname: 'Иванов',
  //   patronymic: 'Иванович',
  //   email: 'ivanov@example.com',
  //   phone: '+7 (999) 123-45-67',
  //   location: 'Москва',
  //   about: 'Профессиональный специалист с 10-летним опытом работы.',
  //   services: []
  // },
  {
    id: 11,
    avatar: ['assets/car2.jpg'],
    name: 'Алексей',
    surname: 'Власов',
    patronymic: 'Игоревич',
    email: 'jieha@example.com',
    phone: '+7 (999) 123-45-67',
    location: 'Москва',
    about: 'Профессиональный специалист с 10-летним опытом работы.',
    services: [
      {
        id: 1,
        title: 'Сборка мебели',
        description: 'Сборка мебели любых производителей',
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
    ]
  }
];

app.get('/api/specialistsProfiles', (req, res) => {
  res.json(specialistsProfiles);
});

const reviews = [
  {
    orderId: 1,
    specialistId: 11, 
    clientId: 22,
    authorName: 'Алексей Петров',
    rating: 5,
    comment: 'Отличный специалист! Сделал всё качественно и в срок. Рекомендую!',
    date: new Date('2023-05-15')
  },
  {
    orderId: 2,
    specialistId: 11, 
    clientId: 22,
    authorName: 'Мария Сидорова',
    rating: 4,
    comment: 'Хорошая работа, но были небольшие задержки. В целом довольна.',
    date: new Date('2023-06-20')
  },
  {
    orderId: 3,
    specialistId: 11, 
    clientId: 22,
    authorName: 'Дмитрий Николаев',
    rating: 5,
    comment: 'Лучший специалист в своём деле. Буду обращаться ещё!',
    date: new Date('2023-07-10')
  }
];

app.get('/api/reviews', (req, res) => {
  const specialistId = parseInt(req.query.specialistId);
  
  if (!specialistId) {
    return res.status(400).json({ error: 'Не указан ID специалиста' });
  }

  const specialistReviews = reviews.filter(r => r.specialistId === specialistId);
  res.json(specialistReviews);
});

app.post('/api/reviews', (req, res) => {
  const review = {
    id: reviews.length + 1,
    ...req.body,
    date: new Date()
  };
  
  reviews.push(review);
  res.status(201).json(review);
});

