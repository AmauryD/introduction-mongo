import mongoose from 'mongoose';
import { MovieModel } from './models/movie.model';

mongoose.set('debug', true);

async function initApp() {
    const connection = await mongoose.connect(
        'mongodb://localhost/technocite',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    );

    console.log('Connected to mongoose', connection.version);

    // Récupérer les 10 films les plus récents
    const firstFilms = await MovieModel.find().sort({ year: -1 }).limit(10);

    console.log(firstFilms);

    const sebastienShow = new MovieModel({
        id: 'tt9999999',
        type: 'add',
        directors: ['Amaury'],
        title: 'Sébastien show',
        rank: 500,
        running_time_secs: 60,
        actors: ['Sébastien'],
        year: 2021
    });

    // Ajouter un nouveau film qui a comme titre "Sébastien show" avec un rang de 500
    await sebastienShow.save();

    // Réduire le rang de ce film de 100
    sebastienShow.rank -= 100;

    await sebastienShow.save();

    await sebastienShow.remove();
}

initApp().catch((e) => {
    console.log('Une erreur innatendue est survenue : ', e);
});
