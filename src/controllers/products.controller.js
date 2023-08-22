import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
    try {
        const { name, category, price, imgURL } = req.body;
        const newProduct = new Product({ name, category, price, imgURL });
        const productSaved = await newProduct.save();
        res.status(201).json(productSaved);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateProductById = async (req, res) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
            new: true
        });
        if (!updateProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(204).json(updateProduct);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
