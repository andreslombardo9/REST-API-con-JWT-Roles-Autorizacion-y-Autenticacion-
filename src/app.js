import express from 'express';
import morgan from 'morgan';
import cors from 'cors'; // Importa el paquete CORS
import productRoutes from './routes/products.routes.js';
import authRoutes from './routes/auth.routes.js';
import { createRole } from './libs/initialSetUp.js';
import usersRoutes from './routes/user.routes.js';

const app = express();
createRole();

app.use(morgan('dev'));

app.use(express.json());


app.use(cors({
  origin: 'http://localhost:5173', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.get('/', (req, res) => {
  res.json('Hello World');
});

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

export default app;
