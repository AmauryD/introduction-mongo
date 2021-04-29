const db = connect("technocite");

// Sélectionnez le nombre de films par réalisateurs qui ont un rating entre 8 et 10, ensuite ne prendre que le résultat où le réalisateur a plus de 5 films

const result = db.movies.aggregate([
  {
    // sélectionne uniquement les colonnes rating, directors, actors
    $project: {
      rating: true,
      directors: true,
      actors: true,
      title: true,
    },
  },
  {
    // qui ont un rating entre 8 et 10
    $match: {
      rating: {
        $gte: 8,
        $lte: 10,
      },
    },
  },
  {
    $unwind: "$directors",
  },
  {
    $group: {
      _id: "$directors",
      nombreDeFilms: { $sum: 1 },
      lesFilms: { $push: "$title" },
    },
  },
  {
    $match: {
      nombreDeFilms: {
        $gt: 5,
      },
    },
  },
]);

printjson(result.toArray());
