const express =require('express');
const { default: mongoose } = require('mongoose');
const Product=require('./models/productModels')
const app=express();
app.use(express.json())
require('dotenv').config();
//routes

const MONGO_URL=process.env.MONGO_URL
const PORT=process.env.PORT

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

// save a product
app.post('/products', async (req, res) => {
  try {
    const { name, quantity, price, image } = req.body;

    // Create a new product instance
    const product = new Product({
      name,
      quantity,
      price,
      image,
    });

    // Save the product to the database
    const savedProduct = await product.save();

    res.status(201).json({messsage:"Succesfully created a product"});
  } catch (error) {
    res.status(500).json({ error: 'Failed to save the product to the database' });
  }
});

//fetch all products

app.get('/products', async (req, res) => {
    try {
      const products = await Product.find({});
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products from the database' });
    }
  });
  
// find a product by id

app.get('/products/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch product from the database' });
    }
  });

 
 //update a product
 
 app.put('/products/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const updates = req.body;
  
      const updateObject = {};
  
      if (updates.name) {
        updateObject.name = updates.name;
      }
  
      if (updates.quantity) {
        updateObject.quantity = updates.quantity;
      }
  
      if (updates.price) {
        updateObject.price = updates.price;
      }
  
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $set: updateObject },
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update product in the database' });
    }
  });


  //delete a product

  

app.delete('/products/:id', async (req, res) => {
    try {
      const productId = req.params.id;
  
      const deletedProduct = await Product.findByIdAndDelete(productId);
  
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete product from the database' });
    }
  });
  

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


