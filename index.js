const express = require("express");
const mongoose = require('mongoose');
const { MONGO_IP, MONGO_PORT, MONGO_USERNAME, MONGO_PASS } = require("./config/config");

const mongoURL= `mongodb://${MONGO_USERNAME}:${MONGO_PASS}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoutes")
const connectWithRetry = () => {
    mongoose.connect(mongoURL,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Successfully  connected to the DB") )
    .catch( (e) => {  console.log('Failed ya hamdy to connect to MongoDB')
                      setTimeout(connectWithRetry,5000)
 } );
}
 
connectWithRetry(); 


//mongoose.connect('mongodb://root:root@172.31.0.2:27017/').then(() => console.log("Successfully  connected to the DB") ).catch( (e) => console.log('falieddddddd') );
const app = express();
app.get("/", (req,res) => {
    res.send("<h2> HI There , this Hamada !!!   </h2>");
}    ); 
app.use(express.json());
app.use("/api/v1/posts",postRouter)

app.use("/api/v1/users",userRouter)

const port = process.env.PORT || 3000;

app.listen( port, () => console.log(`listening on port ${port}`) );

