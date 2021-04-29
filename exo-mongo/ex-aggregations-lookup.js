const db = connect("store");

const result = db.orders.aggregate([
  // on va joindre l'item de l'order
  {
    $lookup: {
      from: "inventory",
      localField: "item",
      foreignField: "sku",
      as: "itemInventory",
    },
  },
  // on sélectionne que la relation et la quantité
  {
    $project: {
      itemInventory: true,
      quantity: true,
    },
  },
  // on dépaquette la relation pour n'avoir qu'un objet
  {
    $unwind: "$itemInventory",
  },
]);

printjson(result.toArray());
