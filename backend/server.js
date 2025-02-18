const express = require('express');
const connectDB = require('./config/db');
const leadRoutes = require('./routes/leadRoutes');
const estimateRoutes = require('./routes/estimateRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require("cors");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.origin1 }));  
app.use(cors({ origin: "https://lead-front-sai-nsgs-projects.vercel.app" }));  
connectDB();

app.use(express.json());

app.use('/api/leads', leadRoutes);
app.use('/api/estimates', estimateRoutes);
app.use('/api/auth',authRoutes)

app.listen(PORT, () => console.log(`port ${PORT}`));
