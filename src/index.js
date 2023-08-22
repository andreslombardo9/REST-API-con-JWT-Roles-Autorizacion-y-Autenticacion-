import app from "./app.js";
import './db.js';
import { connectDB } from "./db.js";
connectDB();
app.listen(3000);
console.log('server listen on port ', 3000);