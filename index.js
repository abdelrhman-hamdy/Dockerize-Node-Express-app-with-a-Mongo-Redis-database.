const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis");
//const cors = require("cors");
let RedisStore = require("connect-redis")(session);




  
const { MONGO_IP, MONGO_PORT, MONGO_USERNAME, MONGO_PASS ,REDIS_URL,SESSION_SECRET,REDIS_PORT} = require("./config/config");
let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT,
  });

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
const app = express();


app.enable("trust proxy");



app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: SESSION_SECRET,
      cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 10000,
      },
    })
  );

//mongoose.connect('mongodb://root:root@172.31.0.2:27017/').then(() => console.log("Successfully  connected to the DB") ).catch( (e) => console.log('falieddddddd') );

app.get("/api/v1", (req,res) => {
    res.send("<h2> HI There , this Hamada's Brother !!!   </h2>");
    console.log("Testing the Nginx load balancer")
}    ); 



app.use(express.json());
app.use("/api/v1/posts",postRouter)

app.use("/api/v1/users",userRouter)

const port = process.env.PORT || 3000;

app.listen( port, () => console.log(`listening on port ${port}`) );

