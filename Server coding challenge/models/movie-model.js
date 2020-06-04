const mongoose = require( 'mongoose' );

const moviesSchema = mongoose.Schema({
    movie_ID : {
        type : Number,
        unique : true,
        required : true
    },
    movie_title : {
        type : String,
        required : true
    },
    year :  {
        type : Number,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    actors : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'actors',
        required : true
    }]
});

const moviesCollection = mongoose.model( 'movies', moviesSchema );

const Movies = {
    createMovie : function( newMovie ){
        return moviesCollection
                .create( newMovie )
                .then( createdMovie => {
                    return createdMovie;
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
    findActorInMovie : function(actor){
        return moviesCollection
            .populate(actors)
            .then(d=>{
                return d;
            })
            .catch(err=>{
                return err;
            })
            
    },
    getMovieByID : function(movie){
        return moviesCollection
            .find({movie_ID:movie})
            .then(resp=>{
                return resp
            })
            .catch(err=>{
                return err
            })
    },
    addActorToMovieList :function(actor,movie){
        return moviesCollection
            .find({movie_ID:movie})
            .then(resp=>{
                return resp
            })
            .catch(err=>{
                return err
            })

    }
}

module.exports = {
    Movies
};

