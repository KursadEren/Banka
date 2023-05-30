import express from "express";
import postgresClient from './config/db.js';
import cors from 'cors'
import router from './routers/useRouter.js'

const app = express()
app.use(express.json())


app.use('/users',router)

const PORT = process.env.PORT || 5000

const corsOptions = {
    origin: 'http://192.168.2.101:19000' ,
    
    // React Native uygulamanızın çalıştığı adres
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  app.use(cors(corsOptions));
  

app.listen(PORT, () =>{
    console.log(`Listening Port ${PORT} `)
    postgresClient.connect(err =>{
        if(err){
            console.log('Connection err', err.stack)
        }
        else{
            console.log('db connection')
        }
    })
})