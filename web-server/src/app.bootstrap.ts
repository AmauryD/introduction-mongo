import mongoose from 'mongoose';
import { createServer } from 'http';
require('./models/inventory.model');

mongoose.set('debug', true);

/** APP INIT PART 2 */
async function init() {
    await mongoose.connect('mongodb://localhost/store', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
}

init().catch((e) => {
    console.log('Une erreur innatendue est survenue : ', e);
});
