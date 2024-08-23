const express = require("express");
const { mongoose } = require("mongoose");
const mainRouter = require("./routes/user");

require("dotenv").config({ path: "./config/.env" });

const app = express();
app.use(express.json());

app.use("/api/v1", mainRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`DB is connected and server is active at ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
