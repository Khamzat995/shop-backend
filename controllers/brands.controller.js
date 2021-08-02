const Brand = require("../models/Brand.model");

module.exports.brandsController = {
  getAllBrands: async (req, res) => {
    try {
      const brands = await Brand.find();

      return res.json(brands);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  getBrandById: async (req, res) => {
    const { id } = req.param;

    try {
      const brand = await Brand.findById(id);

      if (!brand) {
        return res.status(404).json({
          error: "Бранд с таким ID не найден",
        });
      }

      return res.json(brand);
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
    const { name } = req.body;
    const { id } = req.params;

    if (!name) {
      return res.status(400).json({
        error: "Необходимо указать новое название бренда",
      });
    }

    try {
      const edited = await Brand.findByIdAndUpdate(id, { name }, { new: true });

      if (!edited) {
        return res.status(400).json({
          error: "Не удалось изменить название. Проверь правильность ID",
        });
      }

      return res.json(edited);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },
};
