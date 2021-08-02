const User = require("../models/User.model");

module.exports.userController = {
  createUser: async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        error: "Необходимо указать имя покупателя",
      });
    }

    try {
      const user = await User.create({ name });

      return res.json(user);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
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

  getAllUser: async (req, res) => {
    try {
      const user = await User.find();

      return res.json(user);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  editUser: async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    if (!name) {
      return res.status(400).json({
        error: "Необходимо указать новое имя user",
      });
    }

    try {
      const edited = await User.findByIdAndUpdate(id, { name }, { new: true });

      if (!edited) {
        return res.status(400).json({
          error: "Не удалось изменить user. Проверь правильность ID",
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
