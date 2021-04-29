const db = connect("technocite");

const result = db.movies.aggregate([
  // Step 1
  {
    $project: { actors: true, directors: true },
  },
  // Step 2, limite le nombre de résultats à 100
  {
    $limit: 100,
  },
  // Step 3, "dépaquette les acteurs"
  {
    $unwind: "$actors",
  },
  // Step 4, on veut que les films ayant eu comme acteur Scarlett Johanssson
  {
    $match: {
      actors: "Scarlett Johansson",
    },
  },
  // Step 5, on fait un GROUP BY + COUNT par actors
  {
    $group: {
      _id: "$actors",
      nombreDeFilms: { $sum: 1 },
      directors: { $push: "$directors" },
    },
  },
]);

printjson(result.toArray());
