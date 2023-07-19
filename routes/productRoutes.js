const express=require('express')
const router=express.Router();
const Product=require('../models/productModels')
const {saveproduct, fetchallproduct, findproductbyid, updateproduct, delproduct} =require('../controllers/productController')

// save a product
router.post('/products', saveproduct);
  
  //fetch all products
  
  router.get('/products', fetchallproduct);
    
  // find a product by id
  
  router.get('/products/:id', findproductbyid);
  
   
   //update a product
   
router.put('/products/:id',updateproduct );
  
  
    //delete a product
  
    
  
router.delete('/products/:id', delproduct);
  
module.exports=router;