import express, { Request} from 'express';
// import cors from 'cors';
const cors = require('cors')
import dotenv from 'dotenv';
// import connectDB from './db/database';
import taskRoutes from './routes/taskRoutes';
import boardRoutes from './routes/boardRoutes'
import columnRoutes from './routes/columnRoute'
import subTaskRoutes from './routes/subTaskRoutes'
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());



// app.use('/api/boards/:boardId/columns/:columnId/', taskRoutes);

app.use('/api/boards', boardRoutes);
// app.post('/api/boards/:boardId/columns', (req: Request) => {
//   console.log(req.params);
  
// })
app.use('/api/boards/:boardId/columns', columnRoutes)
app.use('/api/boards/:boardId/columns/:columnId/tasks', taskRoutes)
app.use('/api/boards/:boardId/columns/:columnId/tasks/:taskId/subtasks', subTaskRoutes)


const PORT = process.env.PORT || 3000;

app.listen(+PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
