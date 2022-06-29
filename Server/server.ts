import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { config } from './Config/config'

import doctorRoutes from './Routes/doctorRoutes'

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Connect to mongoose to server 

mongoose.connect(config.mongo.url)
.then(() => {
        console.log('Mongo connected successfully.')       
}).catch((error) => console.log(error));

app.use('/', doctorRoutes);

app.listen('5000', () => {
        console.log('server running in port 5000'); 
})