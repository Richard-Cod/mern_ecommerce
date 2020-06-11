const express = require('express');
const router = express.Router();

const ProductModel = require('../models/productModel').ProductModel

router.get("/", async (req,res) => {
    const products = await ProductModel.find({})
    return res.send(products);

})


router.get('/:id', async (req, res) => {
    const product = await ProductModel.findById(req.params.id);
    if(product) return res.send(product)
    return res.status(500).send({ message: 'Product not founded.' });
})

router.put('/edit/:id', async (req, res) => {
    const product = await ProductModel.findById(req.params.id);

    if(product){
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        product.rating = req.body.rating;
        product.numReviews = req.body.numReviews;

        const productUpdated = await product.save();
        if(productUpdated) return res.status(200).send({ message: 'Product Updated', data: productUpdated });
        
    }
    return res.status(500).send({ message: 'Error in product Updating.' });
})


router.post("/", async (req, res) => {
    const {name,price,image,brand,category,countInStock,description,rating,numReviews} = req.body
    //console.log(req.body)
    const product = new ProductModel({
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
      rating,
      numReviews,
    });

    
    const newProduct = await product.save();
    if (newProduct) return res.status(201).send({ message: 'New Product Created', data: newProduct });
    return res.status(500).send({ message: ' Error in Creating Product.' });

})


router.delete('/:id', async (req, res) => {
    const product = await ProductModel.findById(req.params.id);
    if(product){product.remove();}
})


exports.productRoutes = router ;