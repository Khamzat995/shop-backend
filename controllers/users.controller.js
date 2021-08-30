const User = require("../models/User.model");
const Product = require("../models/Product.model");

module.exports.userController = {
  createUser: async (req, res) => {
    const { name, imageURL, buyProducts, cost, quantity, modifiedOn } = req.body;

    if (!name) {
      return res.status(400).json({
        error: "Необходимо указать имя покупателя",
      });
    }
    try {
       await User.create({
        name,
        imageURL,
        buyProducts,
        cost,
        quantity,
        modifiedOn
      });
      return res.json("Пользователь успешно добавлен");
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  getUserId: async (req, res) => {
    try {
      let user = [];

      if(req.params.id) {
        user = await User.find({ _id: req.params.id }).lean();
      } else {
        user = await User.find({}).lean();
      }
      res.render("user-product", {
        user,
      });
    } catch (e) {
      console.log(e.message);
    }
  },

  removeUser: async (req, res) => {
    const { id } = req.params;

    try {
      const deleted = await User.findByIdAndRemove(id);

      if (!deleted) {
        return res.status(400).json({
          error: "Не удалось удалить покупателя. Укажите верный ID",
        });
      }
      return res.json({
        message: "Покупатель успешно удален",
      });
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  editUser: async (req, res) => {
    try {
      const patch = await User.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body }
      );
      await patch.save();
      res.json("User успешно изменен");
    } catch (e) {
      console.log(e.message);
    }
  },

  buyProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId).lean();
      const user = await User.findByIdAndUpdate(req.params.userId).lean();

      if (product.sold) {
        res.json("Товар уже продан");
      }

      else if (user.buyProducts.length > 5) {
        res.json("Нельзя покупать больше 5 продуктов одновременно");
      } else {
        const arr = await User.findByIdAndUpdate(req.params.userId, {
          $push: {
            buyProducts: req.params.productId,
            name: req.params.name,
          },
        }).lean();
        await Product.findByIdAndUpdate(req.params.productId, {
          sold: req.params.productId,
        });
        res.json("Товар успешно продан")
      }
    } catch (e) {
      res.json(e.message);
    }
  },

  returnProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);
      const user = await User.findByIdAndUpdate(req.params.userId);

      await Product.findByIdAndUpdate(req.params.productId, {
        sold: null,
      });
      await User.findByIdAndUpdate(req.params.userId, {
        $pull: {
          buyProduct: req.params.productId,
        },
      });
      res.redirect(`/users/${req.params.userId}`)
    } catch (e) {
      res.json(e.message);
    }
  },

};
