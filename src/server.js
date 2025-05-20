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

app.get('/api/specialistsProfiles', (req, res) => {
  res.json(specialistsProfiles);
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

