const express = require('express');
const dotenv = require("dotenv");
const connectDb = require('./config/db');
const userRouter = require('./routes/auth-routes');
const postRouter = require("./routes/post-routes");
const app = express();

dotenv.config();
connectDb();
app.use(express.json());
app.use('/api',userRouter);
app.use("/api/posts",postRouter);




app.listen(process.env.PORT,()=>console.log(`server is running on port ${process.env.PORT}`));