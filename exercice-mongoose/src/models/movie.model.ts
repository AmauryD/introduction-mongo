import chalk from 'chalk';
import fs from 'fs/promises';
import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        require: true
    },
    type: {
        type: String,
        required: true,
        enum: ['add']
    },
    directors: {
        type: [String],
        required: true
    },
    release_date: {
        type: String
    },
    rating: {
        type: Number
    },
    rank: {
        type: Number
    },
    genres: {
        type: [String]
    },
    title: {
        type: String,
        unique: true,
        required: true
    },
    running_time_secs: {
        type: Number,
        min: [0, 'Un film ne peut pas vous faire gagner du temps']
    },
    actors: {
        type: [String],
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    last_update: {
        type : Date
    }
});

MovieSchema.methods.printBeautiful = function(this: any, showYear = true) {
    return `
        ---${this.title}---
        Release : ${showYear ? this.year : 'Caché'}
        Directors : ${this.directors.join(' | ')}
    `;
};

MovieSchema.statics.everyMoviesExceptJusticeLeague = function(this: any) {
    return this.find({
        title: {
            $ne: 'Justice League'
        }
    });
};

MovieSchema.virtual('titleInColor').get(function (this: any) {
    return chalk.blue(this.title);
});

// Ceci est un example !
// class Movie {
//     static everyMoviesExceptJusticeLeague() {} // méthode statique 
//     printBeautiful() {} // methode d'instance
//     get TitleInRed() {} // virtual
// } 

MovieSchema.pre('save', function(this: any) {
    this.last_update = new Date();
});

// à chaque fois qu'une entité est suavegardée , ajouter une ligne "Le film ${titre} a été sauvegadré à ${heure_de_mise_a_jour}" 
// dans un fichier log "{date}.log"
MovieSchema.post('save', async function (this:any) {
    await fs.appendFile(
        `${new Date().toDateString()}.log`,
        `Le film ${
            this.title
        } a été sauvegardé à ${this.last_update.toISOString()}\n`
    );
});

const MovieModel = mongoose.model<any, any>('movie', MovieSchema);

export { MovieModel };
