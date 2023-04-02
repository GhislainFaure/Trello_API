const { List } = require("../models");

const listController = {
  getAllLists: async (req, res) => {
    try {
      const lists = await List.findAll({
        include: [{ association: "cards", include: [{ association: "tags" }] }],
      });
      //je renvoie ma data en JSON
      res.json(lists);
    } catch (error) {
      console.trace.error(error);
      res.status(500).json(error.toString());
    }
  },
  getListById: async (req, res) => {
    try {
      const foundList = await List.findByPk(req.params.id, {
        include: [{ association: "cards", include: [{ association: "tags" }] }],
      });
      if (!foundList) {
        return res.status(404).json({
          error: "No list with id " + req.params.id,
        });
      }
      res.json(foundList);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },
  createList: async (req, res) => {
    // pour créer une liste j'ai juste besoin de lui donner un name
    // ce name je vais le récuperer dans le body de la requete
    try {
      const newList = new List({
        name: req.body.name,
      });
      await newList.save();
      res.status(201).json(newList);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },
  updateList: async (req, res) => {
    // comment update avec sequelize
    try {
      const listToModify = await List.findByPk(req.params.id);
      if (!listToModify) {
        return res.status(404).json({
          error: "No list with id " + req.params.id,
        });
      }
      if (req.body.name) {
        listToModify.name = req.body.name;
      }
      if (req.body.position) {
        listToModify.position = req.params.position;
      }
      await listToModify.save();
      res.json(listToModify);
    } catch (error) {
      console.trace(error);
    }
  },
  deleteList: async (req, res) => {
    try {
      const listToDelete = await List.findByPk(req.params.id);
      if (!listToDelete) {
        return res.status(404).json({
          error: "No list with id " + req.params.id,
        });
      } else {
        await listToDelete.destroy();
        res.sendStatus(204);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(erro.toString());
    }
  },
};

module.exports = listController;
