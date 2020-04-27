const router = require("express").Router();

router.use("/trips", require("./trips"));
router.use("/people", require("./people"));
router.use("/photos", require("./photos"));
router.use("/destinations", require("./destinations"));

module.exports = router;
