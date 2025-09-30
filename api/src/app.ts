import express from 'express';
import cors from 'cors';
import countriesRoutes from './routes/countriesRoutes';

const app = express();

const port = 3333;
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    exposedHeaders: ['X-Total-Count'],
  })
);

app.use(express.json());

app.use('/', countriesRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
