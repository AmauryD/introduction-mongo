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
    }
});

const MovieModel = mongoose.model('movie', MovieSchema);

export { MovieModel };
