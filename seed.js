const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mongoosemovies')
	.then(db => console.log(`connected to database ${db.connections[0].name}`))
	.catch(err => console.log(err))

const Celebrity = require('./models/Celebrity')
// const Movie = require('./models/Movie')


const celebrities = [
	{
        name: "Tom Cruise",
        occupation: "actor",
        catchPhrase: "I am the storm",
	},
    {
        name: "Arnold Schwarzenegger",
        occupation: "governor",
        catchPhrase: "a la vista baby",
	},
    {
        name:"Jason Statham",
        occupation: "killer machine",
        catchPhrase: "Rule number one: never change the deal",
	}]

    Celebrity.create(celebrities)
	.then(celebrities => {
		console.log(`Success - added ${celebrities.length} Celebrities to the db`)
		mongoose.connection.close()
	})
	.catch(err => console.log(err))