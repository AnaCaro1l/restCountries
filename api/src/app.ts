import express from 'express'
import cors from 'cors';
import countriesRoutes from './routes/countriesRoutes';

const app = express();
app.use('/', countriesRoutes)
const port = 3333;
app.use(
  cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})