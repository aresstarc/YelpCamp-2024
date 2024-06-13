const express = require('express')
const router = express.Router({mergeParams: true})
const Campground = require('../models/campground')
const Review = require('../models/review')
const reviews = require('../controllers/reviews')
const { reviewSchema}  = require('../schemas.js')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const {validateReview , isLoggedIn, isReviewAuthor} = require('../authMiddleware')

// router.post('/',isLoggedIn,isReviewAuthor,validateReview, catchAsync(reviews.createReview))
 
// router.delete('/:reviewId' ,isLoggedIn,isReviewAuthor, catchAsync(reviews.deleteReview))
router.post('/',isLoggedIn,validateReview, catchAsync(reviews.createReview))
 
router.delete('/:reviewId' ,isLoggedIn, catchAsync(reviews.deleteReview))

 module.exports = router