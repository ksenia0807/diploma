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

// Пример API: получение списка заказов
const orders = [
  { id: 1, date: '2024-05-01', service: 'Установка смесителя', price: 1200, status: 'Выполнен' },
  { id: 2, date: '2024-05-10', service: 'Ремонт трубы', price: 1500, status: 'В процессе' },
  { id: 3, date: '2024-05-15', service: 'Устранение засора', price: 1000, status: 'Отменен' }
];

app.get('/api/orders', (req, res) => {
  res.json(orders);
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

