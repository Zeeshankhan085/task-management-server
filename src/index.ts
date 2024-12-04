import express, {Request} from 'express';
// import cors from 'cors';
const cors = require('cors')
import dotenv from 'dotenv';
import connectDB from './database';
import taskRoutes from './routes/taskRoutes';
import boardRoutes from './routes/boardRoutes'
import columnRoutes from './routes/columnRoute'
import './controllers/columnController'
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());



// app.use('/api/boards/:boardId/columns/:columnId/', taskRoutes);
app.use('/api/tasks', taskRoutes);

app.use('/api', boardRoutes);
// app.post('/api/boards/:boardId/columns', (req: Request) => {
//   console.log(req.params);
  
// })
app.use('/api/boards/:boardId', columnRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
