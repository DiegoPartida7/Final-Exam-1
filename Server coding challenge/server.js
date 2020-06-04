const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const {Movies} = require('./models/movie-model')
const {Actors} = require('./models/actor-model')
const errorHandler = require('./middleware/errorHandler')
const app = express();

app.get('/api/add-movie-actor/:movie_ID',jsonParser,(req,res)=>{
    const id = req.params.movie_ID
    const idBody = req.body.movie_ID
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    console.log(id);
    console.log(idBody);
    if (idBody==undefined) {
        res.statusMessage = "Id is missing in the body of the request";
        return res.status(406).end()
        // return errors(406,req,res)
    }else{
    
        if (id!=idBody) {
            res.statusMessage = "Id and IdMovie dont match";
            return res.status(409).end()
        }
        if (!firstName || !lastName) {
            res.statusMessage = "You need to send both firstName and lastName of the actor to add to the movie list";
            return res.status(409).end()
        }
        Actors
            .getActorByName(firstName)
            .then(resp=>{
                console.log(resp)
                if(resp>=1){
                    Movies
                        .getMovieByID(id)
                        .then(resp2=>{
                            if (resp2>=1) {
                                Movies
                                    .findActorInMovie(id)
                                    .then(resp=>{
                                        console.log("respuesta")
                                        console.log(resp)
                                        return res.status(200).end()
                                    })
                                return res.status(200).end()
                            }else{
                                res.statusMessage = "The actor or movie doesnt exist";
                                return res.status(409).end()
                            }
                            
                        })
                    
                } else{
                    
                    res.statusMessage = "The actor or movie doesnt exist";
                    return res.status(409).end()
                }
            })


}

})

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});