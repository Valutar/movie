const express = require('express')
const router = express.Router()
const Celebrity = require('../models/Celebrity')

router.get('/', (req, res) => {
	res.render('home')
})

router.get('/celebrities', (req, res, next) => {
	Celebrity.find()
		.then(celebritiesFromDB => {
			console.log(celebritiesFromDB)
			res.render('celebrities/index', { celebrities: celebritiesFromDB })
		})
		.catch(err => next(err))
})


router.get('/celebrities/new', (req, res, next) => {
	res.render('celebrities/new')
	})

router.get('/celebrities/:id', (req, res, next) => {
	const id = req.params.id
	Celebrity.findById(id)
		.then(celebritiesFromDB => {
				console.log(celebritiesFromDB)
				res.render('celebrities/show', { celebrities: celebritiesFromDB })
		})
		.catch(err => next(err))
})


router.post('/celebrities/:id/delete', (req, res, next) => {
	const id = req.params.id
	Celebrity.findByIdAndDelete(id)
		.then(deleteCelebrity => {
			console.log(deleteCelebrity)
			res.redirect('/celebrities')
		})
		.catch(err => next(err))
});


router.post('/celebrities', (req, res, next) => {
	const { name, occupation, catchPhrase } = req.body
		Celebrity.create({ name, occupation, catchPhrase})
		.then(createdCelebrity => {
		console.log(createdCelebrity)
				res.redirect(`/celebrities/${createdCelebrity._id}`)
			})
			.catch(err => next(err))
	});




module.exports = router;

