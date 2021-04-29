// utilise la db technocité sinon je te tape
const db = connect("technocite");

// on stocke le nom dans une variable car je suis un boulet
const nom = "Charlize Theron";

// Augmenter le rank de 1000 pour tous les films dans lesquels a joué Charlize Theron
let result = db.movies.updateMany(
  {
    actors: nom,
  },
  {
    // incrémentation de 1000 du rang du film
    $inc: {
      rank: 1000,
    },
  }
);

printjson(result);

// Sélectionner tous les films joués par CT
result = db.movies.find(
  {
    actors: nom,
  },
  // projection équivaux SELECT rank FROM ...
  {
    rank: true,
  }
);

printjson(result.toArray());
