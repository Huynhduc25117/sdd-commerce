import express from 'express';
const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '100kb' }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'sdd-commerce-api' }));
app.use('/api', (_req, res) => res.status(404).json({ error: 'API route not found' }));
export default app;
