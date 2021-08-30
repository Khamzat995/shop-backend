const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const boxen = require("boxen");
const hbs = require("express-handlebars");

const app = express();

app.set("view engine", "handlebars");
app.engine("handlebars", hbs());

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://khamzat:12345@cluster0.aa1ma.mongodb.net/ShopExpress",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    console.log(
      boxen(chalk.bold.magentaBright("MongoDB подключен"), {
        borderColor: "yellowBright",
        borderStyle: "round",
      })
    );

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(require("./routes/index"));

    app.listen(3070, () => {
      console.log(
        boxen(chalk.bold.greenBright("Сервер подключен"), {
          borderColor: "yellowBright",
          borderStyle: "round",
        })
      );
    });
  } catch (e) {
    console.log(chalk.bgRed.white(`Ошибка при подключении: ${e.toString()}`));
  }
};

start();
