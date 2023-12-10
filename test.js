// on va charger nos variables d'environnement
require("dotenv").config();

const { List, Card, Tag } = require("./app/models");

async function test() {
  // essayons de récuperer les listes

  const listArray = await List.findAll({
    include: [
      {
        association: "cards",
        include: ["tags"],
      },
    ],
  });
  console.log("Voici les listes :", listArray);
  for (const list of listArray) {
    for (const card of list.cards) {
      console.log("j'ai une carte : ", card.content);

      for (const tag of card.tags) {
        console.log("un tag de la carte : ", tag.name);
      }
    }
  }
}

test();
