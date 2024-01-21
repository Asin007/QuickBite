import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './Config/db.js';
import authRoute from './routes/authRoute.js';

dotenv.config();

connectDB();

const app = express();
app.use(express.json())
app.use(morgan('dev'))
app.use('/api/v1/auth', authRoute)

app.get("/", (req, res) => {
    res.send("<h1>Welcome TO QuickBite</h1>");
});

const PORT= process.env.PORT || 8080;

app.listen(PORT, () =>{
    console.log('server running on: ${process.env.Dev_Mode} mode on: ${PORT}'.bgCyan.white);
});