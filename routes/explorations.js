const express = require('express');
const router = express.Router();
const explorations = require('../controllers/explorations');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateExploration } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Exploration = require('../models/exploration');

router.route('/')
    .get(catchAsync(explorations.index))
    .post(isLoggedIn, upload.array('image'), validateExploration, catchAsync(explorations.createExploration))


router.get('/new', isLoggedIn, explorations.renderNewForm)

router.route('/:id')
    .get(catchAsync(explorations.showExploration))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateExploration, catchAsync(explorations.updateExploration))
    .delete(isLoggedIn, isAuthor, catchAsync(explorations.deleteExploration));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(explorations.renderEditForm))



module.exports = router;