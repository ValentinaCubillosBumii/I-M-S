const express = require("express");
const i18next = require("i18next");
const backend = require("i18next-fs-backend");
const middleware = require("i18next-http-middleware");

const mongoose = require("mongoose");
const app = express();
const port = 3000;
require("dotenv").config();
const bookRouter = require("./routes/books.routes")

i18next
  .use(backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    backend: {
      loadPath: "locales/{{lng}}.json"
    }
  });

app.use(middleware.handle(i18next));
app.use(express.json());
app.use("/books", bookRouter);

app.get("/testing", async (req, res) => {
    res.send(req.t("testing"));
});

app.listen(port, () => {
    console.log(`App Listening on Port ${port}`);
});

const connectionString = process.env.CONNECT_STRING;

mongoose
    .connect(connectionString)
    .then(() => console.log("Connected to Mongo DB"))
    .catch((error) => console.log(error));

