import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import todoRoutes from './routes/todos.routes';
import userRoutes from './routes/users.routes';
import * as dotenv from 'dotenv';
import mongoose from "mongoose";
const collectionTodosName = 'todos'; // Replace with your actual collection name for todos
const collectionUsersName = 'users'; // Replace with your actual collection name for users


dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());



 const servicePort = 5000; // You can change the port as needed
 const serviceIpAddress = '127.0.0.1'; // You can change the IP address as needed
 
 // Connect to MongoDB Atlas
 mongoose.connect("mongodb://localhost:27017/local", {
   useNewUrlParser: true, // To use the new parser
   useUnifiedTopology: true // To use the new Server Discover and Monitoring engine
 });
 
 // Get the default connection
 const db = mongoose.connection;
 
 // Event listener for connection errors
 db.on('error', (err) => {
   console.error('MongoDB connection error:', err);
 });
 
 // Event listener for successful connection
 db.once('open', () => {
   console.log('Connected to MongoDB Atlas');
 
   // Start your server or perform other operations here
   app.listen(servicePort, () => {
     console.log('Server is running on port 9000');
   });
 });
app.use(`/${collectionTodosName}`, todoRoutes);
app.use(`/${collectionUsersName}`, userRoutes);

export default app;