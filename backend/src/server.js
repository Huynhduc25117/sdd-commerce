import 'dotenv/config';
import app from './app.js';
const port = Number(process.env.PORT || 5000);
app.listen(port, '127.0.0.1', () => console.log(`API: http://localhost:${port}`));
