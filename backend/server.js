const express = require('express');
const connectDB = require('./config/db');
const leadRoutes = require('./routes/leadRoutes');
const estimateRoutes = require('./routes/estimateRoutes');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: "https://lead-management-79hs.onrender.com" }));  
connectDB();

app.use(express.json());

app.use('/api/leads', leadRoutes);
app.use('/api/estimates', estimateRoutes);

app.listen(PORT, () => console.log(`port ${PORT}`));