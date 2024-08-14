import express from 'express';
import morgan from 'morgan';
import cors from "cors";

import userRouter from './routes/userRoutes.js';
// import configCors from "./config/fixCORS.js"

const app = express();

// Fix CORS
// configCors(app)
app.use(cors("*"))

//Routes
app.use(morgan('combined'))
app.use('/api', userRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});