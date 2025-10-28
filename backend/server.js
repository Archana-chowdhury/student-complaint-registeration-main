const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// --- START CORS CONFIGURATION FIX ---
// The default cors() is too restrictive. This configuration
// explicitly allows your Angular frontend (http://localhost:4200) 
// to send API requests to this backend.
const corsOptions = {
    // Allows requests from your Angular development server
    origin: 'http://localhost:4200', 
    // Allow credentials (like cookies or auth headers) to be sent
    credentials: true, 
    // Allows specific methods like GET, POST, PUT, DELETE, and OPTIONS for preflight requests
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // Allows specific headers needed for authentication
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply the configured CORS middleware
app.use(cors(corsOptions));
// --- END CORS CONFIGURATION FIX ---

// Middleware (The order is important: CORS must come before express.json())
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
// Removed deprecated options useNewUrlParser and useUnifiedTopology
mongoose.connect('mongodb://localhost:27017/college_complaints')
.then(() => console.log('MongoDB Connected Successfully'))
.catch(err => console.log('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/complaints', require('./routes/complaints'));
app.use('/api/users', require('./routes/users'));
app.use('/api/admin', require('./routes/admin'));

// Chatbot Route
app.use('/api/chatbot', require('./routes/chatbot'));

// Port is set to 3000
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});