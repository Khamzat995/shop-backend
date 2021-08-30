const Product = require("../models/Product.model");
const User = require("../models/User.model");
const Category = require("../models/Category.model");
const Brand = require("../models/Brand.model")

module.exports.productsController = {
  allProducts: async (req, res) => {
    try {
      const limitValue = req.query.limit || 9;
      const skipValue = req.query.skip || 0;
      const get = await Product.find().populate("categoryId").populate("brandId").lean().limit(limitValue).skip(skipValue);
      res.render("home", {
        product: get,
      });
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  getProductCat: async (req, res) => {
    try {
      const productCat = await Product.find({ categoryId: req.params.id }).lean();
      const cat = await Category.find().lean();
      res.render("category-product", {
        product: productCat,
        category: cat,
      });
    } catch (e) {
      res.json(e.message);
    }
  },

  getProductBrand: async (req, res) => {
    try {
      const productBrand = await Product.find({ brandId: req.params.id }).lean();
      const brand = await Brand.find().lean();
      res.render("brand-product", {
        product: productBrand,
        brand: brand,
      });
    } catch (e) {
      res.json(e.message);
    }
  },

  getProductId: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).lean();
      console.log(product);
      res.render("single-product", {
        post: product,
      });
    } catch (e) {
      console.log(e.message);
    }
  },

  createProduct: async (req, res) => {
    try {
      const product = await new Product({
        name: req.body.name,
        imageURL: req.body.imageURL,
        price: req.body.price,
        availability: req.body.availability,
        categoryId: req.body.categoryId,
        brandId: req.body.brandId,
        sold: req.body.sold
      });
      await product.save();
      res.json("Product успешно добавлен");
    } catch (e) {
      console.log(e.message);
    }
  },

  editProduct: async (req, res) => {
    try {
      const patch = await Product.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body }
      );
      await patch.save();
      res.json("Product успешно изменен");
    } catch (e) {
      console.log(e.message);
    }
  },



  removeProduct: async (req, res) => {
    const { id } = req.params;

    try {
      const deleted = await Product.findByIdAndRemove(id);

      if (!deleted) {
        return res.status(400).json({
          error: "Не удалось удалить продукт. Укажите верный ID",
        });
      }
      return res.json({
        message: "Продукт успешно удален",
      });
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  takeProduct: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.userId, {
        $pull: { bayProduct: req.params.productId },
      });
      await Product.findByIdAndUpdate(req.params.productId, {
        sold: null,
      });
      res.redirect(`/admin/user/${req.params.productId}`)
    } catch (e) {
      res.json(e.message);
    }
  },
};
