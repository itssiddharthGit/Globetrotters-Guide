const Exploration = require('../models/exploration');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const exploration = await Exploration.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    exploration.reviews.push(review);
    await review.save();
    await exploration.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/explorations/${exploration._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Exploration.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/explorations/${id}`);
}
