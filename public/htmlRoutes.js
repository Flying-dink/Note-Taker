
const express = require ("express");
const {join} = require("path");
const router= require("express").Router();
//Html Route

const PORT = process.env.PORT || 3005;
const app = express();
const apiRoutes = require("./routes/apiRoutes/index.js");
const htmlRoutes = require("./routes/htmlRoutes/index.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(join(__dirname, "public")));

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});

//Html route
router.get("/", (req, res) => {
  res.sendFile(join(_dirname, "../../public/index.html"));
});

router.get("/notes", (req, res) => {
  res.sendFile(join(_dirname, "../../public/notes.html"));
});

router.get("*", (req, res) => {
  res.sendFile(join(_dirname, "../../public/notes.html"));
});
module.exports = router;