const router = require("express").Router();
module.exports = router;

// /admin/users
router.use("/users", require("./users"));

// /admin/products
router.use("/products", require("./products"));

// /admin/orders
router.use("/orders", require("./orders"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});