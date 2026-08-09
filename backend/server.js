import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { init } from './db/db.js';
import { PORT } from './config.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

init()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });