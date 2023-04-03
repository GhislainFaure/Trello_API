const { Card } = require("../models");
const { List } = require("../models");

const cardController = {
  getCardsInList: async (req, res) => {
    try {
      const listId = req.params.id;
      const cards = await Card.findAll({
        where: {
          list_id: listId,
        },
        include: "tags",
        order: [["position", "ASC"]],
      });

      if (!cards) {
        res.status(404).json("Cant find cards with list_id " + listId);
      } else {
        res.json(cards);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  getOneCard: async (req, res) => {
    try {
      const card = await Card.findByPk(req.params.id, {
        include: [{ association: "tags" }],
      });
      if (!card) {
        return res.status(404).json({
          error: "Can't find card with id " + req.params.id,
        });
      }
      res.json(card);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },
  createCard: async (req, res) => {
    try {
      const { content, color, list_id } = req.body;

      let bodyErrors = [];
      if (!content) {
        bodyErrors.push(`content can not be empty`);
      }
      if (!list_id) {
        bodyErrors.push(`list_id can not be empty`);
      }

      if (bodyErrors.length) {
        res.status(400).json(bodyErrors);
      } else {
        let newCard = Card.build({ content, list_id });
        if (color) {
          newCard.color = color;
        }
        await newCard.save();
        res.json(newCard);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },
  modifyCard: async (req, res) => {
    try {
      const cardId = req.params.id;
      const { content, color, list_id, position } = req.body;

      // on inclue les tags pour pouvoir les renvoyer à la fin de l'update
      let card = await Card.findByPk(cardId, {
        include: ["tags"],
      });
      if (!card) {
        res.status(404).json(`Cant find card with id ${cardId}`);
      } else {
        // on ne change que les paramètres envoyés
        if (content) {
          card.content = content;
        }
        if (list_id) {
          card.list_id = list_id;
        }
        if (color) {
          card.color = color;
        }
        if (position) {
          card.position = position;
        }
        await card.save();
        res.json(card);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },
  deleteCard: async (req, res) => {
    try {
      const cardToDelete = await Card.findByPk(req.params.id);
      if (!cardToDelete) {
        return res.status(404).json({
          error: "Can't find card with id " + req.params.id,
        });
      } else {
        await cardToDelete.destroy();
        res.json("ok");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = cardController;
