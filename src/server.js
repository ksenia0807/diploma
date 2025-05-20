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

const services = [
    {
      id: 1,
      specialistId: 33,
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
      specialistId: 44,
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
      specialistId: 55,
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
      specialistId: 66,
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
      specialistId: 77,
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
      specialistId: 88,
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
      specialistId: 99,
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
      specialistId: 100,
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
      specialistId: 111,
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
      specialistId: 102,
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

app.get('/api/specialists', (req, res) => {
  res.json(services);
});

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
    rating: 5.0,
    email: 'jieha@example.com',
    phone: '+7 (999) 123-45-67',
    location: 'Москва',
    about: 'Профессиональный специалист с 10-летним опытом работы.',
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
    login: 'kukuruzka13',
    rating: 5,
    comment: 'Отличный специалист! Сделал всё качественно и в срок. Рекомендую!',
    date: new Date('2023-05-15')
  },
  {
    orderId: 2,
    specialistId: 11, 
    clientId: 22,
    login: 'Grigoriy',
    rating: 4,
    comment: 'Хорошая работа, но были небольшие задержки. В целом доволен.',
    date: new Date('2023-06-20')
  },
  {
    orderId: 3,
    specialistId: 11, 
    clientId: 22,
    login: 'dNikolaev89',
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

