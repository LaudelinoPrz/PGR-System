const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth');
const uploadsRouter = require('./routes/uploads');
const apolicesRouter = require('./routes/apolices');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/uploads', uploadsRouter);
app.use('/api/apolices', apolicesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`PGR backend running on ${PORT}`));
