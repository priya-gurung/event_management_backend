require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const mongoose = require('mongoose');

const app = express();

//mongodb connection
const connectDB = async()=>{
    try{
        const uri = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/event-management-system';
        // console.log(uri);
        await mongoose.connect(uri);
        console.log("DB connected");
    } catch (err) {
        console.log("DB connection failed: ", err.message);
    }
}
connectDB();

app.use(cors({
    origin: process.env.CLIENT_ORIGIN || '*'
}));
app.use(express.json());

app.get('/health', (req,res)=>{
    res.json({status: 'ok'})
});

app.use('/api/user', userRoutes);
app.use('/api/events', eventRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Port running on local host ${PORT}`);
})