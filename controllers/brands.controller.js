const Brand = require("../models/Brand.model");

module.exports.brandsController = {
  allBrands: async (req, res) => {
    try {
      const brands = await Brand.find();

      res.render("home", {
        product: brands,
      });
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  getBrandById: async (req, res) => {
    const { id } = req.params;

    try {
      const brand = await Brand.findById(id);
      res.render("brand-product", {
        product: brand,
      });
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  createBrand: async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        error: "Необходимо указать название нового бренда",
      });
    }

    try {
      const brand = await Brand.create({ name });

      return res.json(brand);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  removeBrand: async (req, res) => {
    const { id } = req.params;

    try {
      const deleted = await Brand.findByIdAndRemove(id);

      if (!deleted) {
        return res.status(400).json({
          error: "Не удалось удалить бренд. Укажите верный ID",
        });
      }

      return res.json({
        message: "Бренд успешно удален",
      });
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  editBrand: async (req, res) => {
    try {
      const patch = await Brand.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body }
      );
      await patch.save();
      res.json("Бранд успешно изменен");
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },
};
