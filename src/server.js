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
      photos: ['assets/man.jpg', 'assets/2.jpg', 'assets/3.jpg'],
      shortDescription: 'Установка, ремонт и замена сантехники. Ликвидация протечек, засоров и аварийных ситуаций. Работаю 24/7.',
      fullDescription: 'Мастер с 10-летним опытом. Работаю с трубами, смесителями, бойлерами, унитазами. Использую качественные материалы. Даю гарантию на работу. Срочный выезд по Москве.',
      location: 'г. Москва',
      services: [
        { name: 'Устранение засора', price: 1500 },
        { name: 'Замена смесителя', price: 1200 },
        { name: 'Установка раковины', price: 2500 }
      ]
    },
    {
      id: 2,
      title: 'Ремонт и обслуживание автомобилей',
      rating: 4.9,
      photos: ['assets/car1.jpg', 'assets/car2.jpg', 'assets/car3.jpg'],
      shortDescription: 'Диагностика, ТО, замена масла, ремонт двигателя и ходовой. Работаю с иномарками и отечественными авто.',
      fullDescription: 'Автосервис с 15-летним опытом. Провожу полный спектр работ: от замены колодок до капитального ремонта. Использую оригинальные запчасти и качественные аналоги.',
      location: 'г. Новосибирск',
      services: [
        { name: 'Замена масла', price: 1500 },
        { name: 'Диагностика подвески', price: 1000 },
        { name: 'Ремонт двигателя', price: 8000 }
      ]
    },
    {
      id: 3,
      title: 'Уборка помещений',
      rating: 4.8,
      photos: ['assets/cleaning3.jpg', 'assets/cleaning2.jpg', 'assets/cleaning1.jpg'],
      shortDescription: 'Профессиональная уборка квартир, офисов и коммерческих помещений. Использую экологичные средства и современное оборудование.',
      fullDescription: 'Опыт работы — 5+ лет. Выполняю генеральную, поддерживающую и уборку после ремонта. Уделяю внимание деталям: мою окна, чищу плитку, дезинфицирую поверхности. Работаю быстро и аккуратно.',
      location: 'г. Москва',
      services: [
        { name: 'Уборка квартиры (1-комн.)', price: 2000 },
        { name: 'Уборка офиса (до 50 м²)', price: 2500 },
        { name: 'Мытьё окон', price: 500 }
      ]
    },
    {
      id: 4,
      title: 'Химчистка',
      rating: 4.9,
      photos: ['assets/dryclean1.jpg', 'assets/dryclean2.jpg'],
      shortDescription: 'Химчистка диванов, кресел, ковров и автомобильных салонов. Удаляю сложные пятна без повреждения тканей.',
      fullDescription: 'Работаю на профессиональном оборудовании с безопасной химией. Удаляю пятна от вина, жира, кофе и др. Гарантирую отсутствие разводов и запахов. Выезд в день обращения!',
      location: 'г. Санкт-Петербург',
      services: [
        { name: 'Химчистка дивана', price: 3500 },
        { name: 'Чистка ковра (до 5 м²)', price: 2000 },
        { name: 'Химчистка салона авто', price: 4000 }
      ]
    },
    {
      id: 5,
      title: 'Услуги электрика',
      rating: 5.0,
      photos: ['assets/electrician1.jpg', 'assets/electrician2.jpg'],
      shortDescription: 'Ремонт электропроводки, установка розеток, выключателей и светильников. Диагностика и устранение неисправностей.',
      fullDescription: 'Опыт — 8 лет. Работаю с квартирами, домами и офисами. Делаю монтаж «с нуля», замену старой проводки, подключение бытовой техники. Соблюдаю технику безопасности.',
      location: 'г. Екатеринбург',
      services: [
        { name: 'Замена розетки', price: 500 },
        { name: 'Установка люстры', price: 1000 },
        { name: 'Ремонт электропроводки', price: 3000 }
      ]
    },
    {
      id: 6,
      title: 'Ремонт бытовой техники',
      rating: 3.8,
      photos: ['assets/appliance1.jpg', 'assets/appliance2.jpg'],
      shortDescription: 'Ремонт холодильников, стиральных машин, плит и другой техники. Официальная гарантия, оригинальные запчасти.',
      fullDescription: 'Сертифицированный мастер. Диагностирую и чиню технику Samsung, LG, Bosch и др. Выезжаю на дом или принимаю в сервисе. Бесплатная диагностика при ремонте!',
      location: 'г. Казань',
      services: [
        { name: 'Ремонт стиральной машины', price: 2500 },
        { name: 'Замена уплотнителя холодильника', price: 1800 },
        { name: 'Чистка посудомоечной машины', price: 1200 }
      ]
    },
    {
      id: 7,
      title: 'Благоустройство',
      rating: 4.1,
      photos: ['assets/landscaping2.jpg'],
      shortDescription: 'Озеленение, укладка газонов, установка беседок и садовых дорожек. Создаю уют на вашем участке.',
      fullDescription: 'Ландшафтный дизайн и работы по благоустройству территории. Посадка растений, монтаж систем полива, декоративное мощение. Индивидуальный проект под ваш бюджет.',
      location: 'г. Краснодар',
      services: [
        { name: 'Укладка газона', price: 3000 },
        { name: 'Установка беседки', price: 15000 },
        { name: 'Мощение дорожек', price: 2000 }
      ]
    },
    {
      id: 8,
      title: 'Благоустройство',
      rating: 2.9,
      photos: ['assets/landscaping1.jpg', 'assets/landscaping2.jpg'],
      shortDescription: 'Озеленение, укладка газонов, установка беседок и садовых дорожек. Создаю уют на вашем участке.',
      fullDescription: 'Ландшафтный дизайн и работы по благоустройству территории. Посадка растений, монтаж систем полива, декоративное мощение. Индивидуальный проект под ваш бюджет.',
      location: 'г. Краснодар',
      services: [
        { name: 'Укладка газона', price: 3000 },
        { name: 'Установка беседки', price: 15000 },
        { name: 'Мощение дорожек', price: 2000 }
      ]
    },
    {
      id: 9,
      title: 'Перевозка',
      rating: 4.5,
      photos: ['assets/delivery1.jpg', 'assets/delivery2.jpg'],
      shortDescription: 'Грузоперевозки по городу и области. Газель, грузчики, аккуратное обращение с вещами. Недорого!',
      fullDescription: 'Переезды квартир и офисов, доставка стройматериалов, вывоз мусора. Автопарк: газели 3,5 т, грузчики с опытом. Фиксированные цены, без скрытых платежей.',
      location: 'г. Воронеж',
      services: [
        { name: 'Переезд квартиры (1-комн.)', price: 5000 },
        { name: 'Доставка стройматериалов', price: 2500 },
        { name: 'Вывоз мусора', price: 3000 }
      ]
    },
    {
      id: 10,
      title: 'Организация мероприятий',
      rating: 4.2,
      photos: ['assets/event1.jpg', 'assets/event2.jpg', 'assets/event3.jpg'],
      shortDescription: 'Проведение свадеб, корпоративов, дней рождения. Полный цикл: от идеи до реализации.',
      fullDescription: 'Организую мероприятия под ключ: подбор площадки, кейтеринг, ведущие, декор, фото/видеосъёмка. Учитываю пожелания и бюджет. Опыт — 7 лет, 100+ успешных событий.',
      location: 'г. Сочи',
      services: [
        { name: 'Организация свадьбы', price: 50000 },
        { name: 'Корпоратив на 50 человек', price: 30000 },
        { name: 'Детский праздник', price: 15000 }
      ]
    }
  ];

app.get('/api/specialists', (req, res) => {
  res.json(specialists);
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

