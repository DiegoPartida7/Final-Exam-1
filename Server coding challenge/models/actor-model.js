const mongoose = require( 'mongoose' );

const actorsSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    actor_ID : {
        type : Number,
        unique : true,
        required : true
    }
});

const actorsCollection = mongoose.model( 'actors', actorsSchema );

const Actors = {
    createActor : function( newActor ){
        return actorsCollection
                .create( newActor )
                .then( createdActor => {
                    return createdActor;
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
    getActorByName : function(actor){
        return actorsCollection
            .find({firstName:actor})
            .then(resp=>{
                return resp
            })
            .catch(err=>{
                return err
            })
    }
}

module.exports = {
    Actors
};

