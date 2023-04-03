const listController = require("./controllers/listController");
const cardController = require("./controllers/cardController");
const tagController = require("./controllers/tagController");

const express = require("express");

const router = express.Router();

router.get("/lists", listController.getAllLists);
router.get("/lists/:id", listController.getListById);
router.post("/lists", listController.createList);
router.patch("/lists/:id", listController.modifyList);
router.delete("/lists/:id", listController.deleteList);

router.get("/lists/:id/cards", cardController.getCardsInList);
router.get("/cards/:id", cardController.getOneCard);
router.post("/cards", cardController.createCard);
router.patch("/cards/:id", cardController.modifyCard);
router.delete("/cards/:id", cardController.deleteCard);

router.get("/tags", tagController.getTags);
router.post("/tags", tagController.createTag);
router.patch("/tags/:id", tagController.modifyTag);
router.delete("/tags/:id", tagController.deleteTag);

/* ROUTES D4ASSOCIATION */

router.post("/cards/:id/tags", tagController.associateTagToCard);
router.delete("/cards/:cardId/tags/:tagId", tagController.removeTagToCard);

module.exports = router;
