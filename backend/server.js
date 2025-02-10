const express = require('express');
const connectDB = require('./config/db');
const leadRoutes = require('./routes/leadRoutes');
const estimateRoutes = require('./routes/estimateRoutes');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: "https://lead-front-o3y0d4v2i-sai-nsgs-projects.vercel.app" }));  
connectDB();

app.use(express.json());

app.use('/api/leads', leadRoutes);
app.use('/api/estimates', estimateRoutes);

app.listen(PORT, () => console.log(`port ${PORT}`));
