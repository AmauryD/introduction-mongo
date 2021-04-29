const db = connect("technocite");

// Ajouter l'acteur Key Key aux films "+1", "3D rou pu tuan zhi ji le bao jian" et "Anamorph"

const films = ["+1", "3D rou pu tuan zhi ji le bao jian", "Anamorph"];

let result = db.movies.update(
  {
    title: {
      // Match les films dans le tableau ci-dessous (on aurait tout aussi bien pu faire 3 OR)
      $in: films,
    },
  },
  {
    // Ajoute dans le tableau des actors, l'acteur "Key key"
    // c'est comme faire un Array.push() en Javascript quoi
    $push: {
      actors: "Key key",
    },
  },
  {
    multi: true,
  }
);

// Find pour vérifier que ça s'est bien rajouté wesh
result = db.movies.find({
  title: {
    // Match les films dans le tableau ci-dessous (on aurait tout aussi bien pu faire 3 OR)
    $in: films,
  },
});

printjson(result.toArray());
