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

