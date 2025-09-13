import Product from "../models/product.js";
import { isAdmin } from "../controllers/userController.js";

export async function getProducts(req, res) {
   /* Product.find().then((data) => {
        res.json(data); 
    }).catch((error) => {
        res.status(500).json({ message: "Error fetching  products", error });
    });*/


   try{

    if(!isAdmin(req)){
      const products = await Product.find();
    res.json(products)
    }else{
      const products = await Product.find({ isAvailable: true });
      res.json(products);
    }
    
  
   }catch(err){
    res.status(500).json({ message: "Error fetching products", error: err.message });
   }
}







export function addProducts (req, res) {

  if(!isAdmin(req)){
    return res.status(403).json({
      message: "You are not authorized to add products",
    });
    return;
}
   
    const product = new Product(
        req.body
    );

    product.save().then(() => {
      res.json({
        message: "Product added successfully",
      });
    }).catch(() => {
      res.json({
        message: "Failed to add product",
        
      });
    });
}







export async function deleteProduct(req,res){
  if(!isAdmin(req)){
    return res.status(403).json({
      message: "You are not authorized to delete products",
    });
    return
  }
   try{
      await Product.deleteOne({productId : req.params.productId});

  res.json({
    message: "Product deleted successfully",
  });
} catch(err){
  res.status(500).json({
    message: "Failed to delete product",
    error: err.message,
  });
 }
}