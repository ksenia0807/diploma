const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

const services = require('./data/services.data.js'); 
const orders = require('./data/orders.data.js'); 
const specialistsProfiles = require('./data/specialists-profiles.data.js'); 
const clientsProfiles = require('./data/clients-profiles.data.js'); 
const reviews = require('./data/reviews.data.js'); 

// Разрешаем CORS для Angular-приложения
app.use(cors());

// Для парсинга JSON в теле запросов
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

app.get('/api/services', (req, res) => {
  res.json(services);
});

app.get('/api/specialistsOrders', (req, res) => {
  res.json(orders);
});

app.post('/api/specialistsOrders', (req, res) => {
  const newOrder = req.body;
  newOrder.id = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
  orders.push(newOrder);
  res.json(newOrder);
});

app.get('/api/specialistsProfiles', (req, res) => {
  res.json(specialistsProfiles);
});

app.patch('/api/specialistsProfiles/:id/rating', (req, res) => {
  const specialistId = parseInt(req.params.id);
  const { rating } = req.body;
  
  const specialistIndex = specialistsProfiles.findIndex(sp => sp.id === specialistId);
  
  if (specialistIndex !== -1) {
    specialistsProfiles[specialistIndex].rating = rating;
    res.json(specialistsProfiles[specialistIndex]);
  } else {
    res.status(404).send('Специалист не найден');
  }
});

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

app.get('/api/clientsProfiles', (req, res) => {
  res.json(clientsProfiles);
});

app.post('/api/clientsProfiles', (req, res) => {
  const { email, phone, login, password } = req.body;

  if (!email || !phone || !login || !password) {
    return res.status(400).json({ 
      error: 'Необходимо указать email, телефон, логин и пароль' 
    });
  }
 
  const existingClient = clientsProfiles.find(
    client => client.email === email || client.login === login
  );
  
  if (existingClient) {
    return res.status(409).json({ 
      error: 'Пользователь с таким email или логином уже существует' 
    });
  }

  const newClient = {
    id: clientsProfiles.length > 0 
      ? Math.max(...clientsProfiles.map(c => c.id)) + 1 
      : 1,
    email,
    login,
    password, 
    avatar: ['assets/default-avatar.jpg'],
    phone: '',
    createdAt: new Date().toISOString()
  };
 
  clientsProfiles.push(newClient);
 
  const responseClient = { ...newClient };
  delete responseClient.password;
  
  res.status(201).json(responseClient);
});