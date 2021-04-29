// utilise la db technocité sinon je te tape
const db = connect("technocite");

// Supprimer les films réalisés par Harald Zwart
let result = db.movies.remove({
  directors: "Harald Zwart",
});

// { nDeleted : 45 }
printjson(result);

result = db.movies
  .find({
    directors: "Harald Zwart",
  })
  .length();

print(result);
