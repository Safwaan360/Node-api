const express =require('express');
const { default: mongoose } = require('mongoose');
const Product=require('./models/productModels')
const app=express();
app.use(express.json())
require('dotenv').config();
const productRoutes=require('./routes/productRoutes')

//routes

const MONGO_URL=process.env.MONGO_URL
const PORT=process.env.PORT

app.use('/',productRoutes)




app.get("/",(req,res)=>{
      
    res.send("NODE API")

})

app.get("/Home",(req,res)=>{
      
    res.send("Safwaan")

})

/*app.post("/products",(req,res)=>{

     console.log(req.body);
     res.send(req.body);

})*/

  
mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("Connected to Mongodb");

    app.listen(PORT,()=>{

        console.log(`Node api running on port ${PORT}`);
   })
   
})
.catch((error)=>{
    console.log(error);
     
})

