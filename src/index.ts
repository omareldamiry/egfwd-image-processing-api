import express from 'express';
import routes from './routes/index';

const app = express();
const port = 5000;

// Routes
app.use('/api', routes);

// Server
app.listen(port);

export default app;
