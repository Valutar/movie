const express = require('express')
const router = express.Router()
const Celebrity = require('../models/Celebrity')


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




module.exports = router;
