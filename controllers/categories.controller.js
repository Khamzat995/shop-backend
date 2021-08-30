const Category = require("../models/Category.model");

module.exports.categoriesController = {
  // allCategories: async (req, res) => {
  //   try {
  //     const category = await Category.find();
  //
  //     res.render("home", {
  //       product: category,
  //     });
  //   } catch (e) {
  //     return res.status(400).json({
  //       error: e.toString(),
  //     });
  //   }
  // },

  getCategoryById: async (req, res) => {
    const { id } = req.params;
    try {
    // const limitValue = req.query.limit || 3;
    // const skipValue = req.query.skip || 0;
    const category = await Category.findById(id);
    res.render("category-product", {
      product: category,
    });
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  createCategory: async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        error: "Необходимо указать название новой категории",
      });
    }

    try {
      const category = await Category.create({ name });

      return res.json(category);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  removeCategory: async (req, res) => {
    const { id } = req.params;

    try {
      const deleted = await Category.findByIdAndRemove(id);

      if (!deleted) {
        return res.status(400).json({
          error: "Не удалось удалить категорию. Укажите верный ID",
        });
      }

      return res.json({
        message: "Категория успешно удалена",
      });
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  editCategory: async (req, res) => {
    try {
      const patch = await Category.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body }
      );
      await patch.save();
      res.json("Категория успешно изменена");
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },
};
