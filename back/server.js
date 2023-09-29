const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const favorisRoutes = require("./routes/favorisRoutes");

const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect("mongodb://127.0.0.1:27017/gwadflix", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to gwadflix db in mongo`);
  })
  .catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
  });

app.use("/api/favoris", favorisRoutes)
const port = 5000;

app.listen(port, () => {
  console.log(`Server start on port ${port}`);
});
