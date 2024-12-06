const express = require('express');
const dotenv = require('dotenv');
const noteRoutes = require('./routes/noteRoutes');


dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3000;


app.use(express.json());
app.use('/api', noteRoutes);


app.use((req, res) => {
  res.status(404).json({ message: 'Rute tidak ditemukan' });
});


app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});