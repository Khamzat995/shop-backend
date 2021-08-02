const Review = require("../models/Review.model");

module.exports.reviewController = {
  createReview: async (req, res) => {
    const { user, product, text } = req.body;

    if (!user) {
      return res.status(400).json({
        error: "Необходимо указать имя покупателя",
      });
    }
    if (!product) {
      return res.status(400).json({
        error: "Необходимо указать ID продукта",
      });
    }

    if (!text) {
      return res.status(400).json({
        error: "Необходимо указать текст отзыва",
      });
    }

    try {
      const review = await new Review({
        user,
        text,
        product,
      });

      await review.save();

      return res.json(review);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  removeReview: async (req, res) => {
    const { id } = req.params;

    try {
      const deleted = await Review.findByIdAndRemove(id);

      if (!deleted) {
        return res.status(400).json({
          error: "Не удалось удалить отзыв. Укажите верный ID",
        });
      }

      return res.json({
        message: "Отзыв успешно удален",
      });
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  getReviewByProductId: async (req, res) => {
    const { id } = req.params;

    try {
      const review = await Review.find({ product: id });

      return res.json(review);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  getAllReviews: async (req, res) => {
    try {
      const review = await Review.find();

      return res.json(review);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },
};
