const { Tag } = require("../models");
const { Card } = require("../models");
const { trace } = require("../router");

const tagController = {
  getTags: async (req, res) => {
    try {
      const tags = await Tag.findAll();
      //je renvoie ma data en JSON
      res.json(tags);
    } catch (error) {
      console.trace.error(error);
      res.status(500).json(error.toString());
    }
  },
  createTag: async (req, res) => {
    try {
      const { name, color } = req.body;
      let bodyError = [];
      if (!name) {
        bodyError.push("name can't be empty");
      }
      if (!color) {
        bodyError.push("color can't be empty");
      }
      if (bodyError.length) {
        res.status(404).json(bodyError);
      } else {
        let newTag = Tag.build({ name, color });
        await newTag.save();
        res.json(newTag);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },
  modifyTag: async (req, res) => {
    try {
      const { name, position } = req.body;
      const tag = await Tag.findByPk(req.params.id);

      if (name) {
        tag.name = name;
      }
      if (color) {
        tag.color = color;
      }
      await tag.save();
      res.json(tag);
    } catch (error) {
      console.trace(error);
    }
  },
  deleteTag: async (req, res) => {
    try {
      const tag = await Tag.findByPk(req.params.id);
      if (!tag) {
        return res.status(404).json({
          error: "Can't find tag with id " + req.params.id,
        });
      } else {
        await tag.destroy();
        res.json("ok");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },
  associateTagToCard: async (req, res) => {
    try {
      const cardId = req.params.id;
      const tagId = req.body.tag_id;

      let card = await Card.findByPk(cardId, {
        include: ["tags"],
      });
      if (!card) {
        res.status(404).json("can't find card with id : " + cardId);
      }
      let tag = await Tag.findByPk(tagId);
      if (!tag) {
        res.status(404).json("can't find tag with id : " + tagId);
      }
      // sequelize s'occupe de lui meme d'opérer l'association avec 'addTag'
      await card.addTag(tag);
      // on doit refaire un select car les associations de l'instance ne sont pas mises a jour
      card = await Card.findByPk(cardId, {
        include: ["tags"],
      });
      res.json(card);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },
  removeTagToCard: async (req, res) => {
    try {
      const cardId = req.params.id;
      const tagId = req.body.tag_id;

      let card = await Card.findByPk(cardId, {
        include: ["tags"],
      });
      if (!card) {
        res.status(404).json("can't find card with id : " + cardId);
      }
      let tag = await Tag.findByPk(tagId);
      if (!tag) {
        res.status(404).json("can't find tag with id : " + tagId);
      }
      await card.removeTag(tag);
      card = await Card.findByPk(cardId, {
        include: ["tags"],
      });
      res.json(card);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },
};

module.exports = tagController;
