const express = require('express')
const router = express.Router()
// const Celebrity = require('../models/Celebrity')
const Movie = require('../models/Movie')

router.get('/', (req, res) => {
	res.render('movie')
})

router.get('/movies', (req, res, next) => {
	Movie.find()
		.then(moviesFromDB => {
			console.log(moviesFromDB)
			res.render('movies/index', { movies: moviesFromDB })
		})
		.catch(err => next(err))
})

router.get('/movies/new', (req, res, next) => {
	res.render('movies/new')
	})

router.post('/movies', (req, res, next) => {
    const { title, genre, plot, cast } = req.body
        Movie.create({ title, genre, plot, cast })
            .then(createdMovie => {
            console.log(createdMovie) 
            res.redirect(`/movies/${createdMovie._id}`)
        })
        .catch(err => next(err))
        });

router.get('/movies/:id', (req, res, next) => {
    const id = req.params.id
        Movie.findById(id)
        .then(moviesFromDB => {
                console.log(moviesFromDB)
        res.render('movies/show', { movies: moviesFromDB })
        })
        .catch(err => next(err))
        })

router.post('/movies/:id/delete', (req, res, next) => {
    const id = req.params.id
    Movie.findByIdAndDelete(id)
    .then(deleteMovie => {
        console.log(deleteMovie)
        res.redirect('/movies')
    })
    .catch(err => next(err))
        });





module.exports = router;
