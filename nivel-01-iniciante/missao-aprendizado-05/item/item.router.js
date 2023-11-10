const express = require("express")
const controller = require("./item.controller")

const router = express.Router()

router.get("/", controller.readAll)
router.get("/:id", controller.readById)
router.post("/", controller.create)
router.put("/:id", controller.updateById)
router.delete("/:id", controller.deleteById)

module.exports = router;
