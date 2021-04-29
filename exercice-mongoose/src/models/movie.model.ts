import mongoose from 'mongoose';
import chalk from 'chalk';

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

const MovieModel = mongoose.model<any, any>('movie', MovieSchema);

export { MovieModel };
