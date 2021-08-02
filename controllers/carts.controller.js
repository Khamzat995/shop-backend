const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");

module.exports.cartController = {
  createCart: async (req, res) => {
    try {
      const cart = await new Cart({});
      cart.save();
      res.json("Корзина создана");
    } catch (error) {
      console.log(error.message);
    }
  },

  addProductInCart: async (req, res) => {
    try {
      const cart = await Cart.findOneAndUpdate({});
      const product = await Product.findById(req.params.id);
      cart.products.push(req.params.id);
      cart.cost += product.price;
      cart.quantity++;
      cart.save();
      res.json("Продукт добавлен в корзину");
    } catch (error) {
      console.log(error.message);
    }
  },

  deleteProductInCart: async (req, res) => {
    try {
      const cart = await Cart.findOneAndUpdate({});
      const product = await Product.findById({ _id: req.params.id });
      cart.products.forEach((item, i) => {
        if (item.toString() === req.params.id) {
          cart.products.splice(i, 1);
        }
      });
      cart.cost -= product.price;
      cart.quantity--;

      cart.save();
      res.json("Продукт удален из корзины ");
    } catch (error) {
      console.log(error.message);
    }
  },
};
