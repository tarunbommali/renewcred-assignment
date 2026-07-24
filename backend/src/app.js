const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const contentRoutes = require('./routes/content.routes');
const { errorHandler } = require('./middleware/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'RenewCred CMS API', timestamp: new Date() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);

// Error Handler Middleware
app.use(errorHandler);

module.exports = app;
