const listController = require("./controllers/listController");
const cardController = require("./controllers/cardController");
const tagController = require("./controllers/tagController");

const express = require("express");

const router = express.Router();

router.get("/lists", listController.getAllLists);
router.get("/lists/:id", listController.getListById);
router.post("/lists", listController.createList);
router.patch("/lists/:id", listController.updateList);
router.delete("/lists/:id", listController.deleteList);
router.get("/lists/:id/cards", cardController.getAllCards);
router.post("/lists/:id", cardController.createCard);
router.patch("/lists/:id/cards/:id", cardController.updateCard);
router.delete("/lists/:id/cards/:id", cardController.deleteCard);

router.get("/lists/:id/cards/:id/tags", tagController.getTags);
router.post("/lists/:id/cards/:id/", tagController.createTag);

module.exports = router;
