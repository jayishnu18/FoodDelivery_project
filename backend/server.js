import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import dotenv from 'dotenv';
import orderRouter from './routes/OrderRouter.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const app = express();
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

const PORT = process.env.PORT || 5000;

// Update the MongoDB connection string for local development


mongoose.set("strictQuery",true); //Deprection Warning //To supress warning
mongoose.connect("mongodb+srv://vishalreddy0072:vishal9514@cluster0.cxaepvw.mongodb.net/myFirstDatabase");
var db = mongoose.connection;
db.on("open",()=>console.log("Connected to DB"));
db.on("error",()=>console.log("Error occurred"));

app.use(cors());
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

// Serve static assets if in production (uncomment when needed)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// app.use(express.static(path.join(__dirname, '../frontend/build')));
// if (process.env.NODE_ENV === 'production') {
//     app.get('*', (req, res) => {
//         res.sendFile(
//             path.resolve(__dirname, '../frontend', 'build', 'index.html')
//         );
//     });
// } else {
//     app.get('/', (req, res) => {
//         res.send('API is running....');
//     });
// }

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
