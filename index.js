require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
const routes = require('./config/routes');
const errorHandler = require('./app/middleware/errorHandler');

const PORT = process.env.PORT || 5000;

// Middleware
// app.use(cors({
//   origin: 'https://kanban-board-frontend-rho.vercel.app', // your frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.options('*', cors()); // handle preflight requests
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Kanban backend running at http://localhost:${PORT}`);
});