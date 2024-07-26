const Exploration = require('../models/exploration');
const { cloudinary } = require("../cloudinary");

const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

module.exports.index = async (req, res) => {
    const explorations = await Exploration.find({}).populate('popupText');;
    res.render('explorations/index', { explorations })
}

module.exports.renderNewForm = (req, res) => {
    res.render('explorations/new');
}

module.exports.createExploration = async (req, res, next) => {
    const geoData = await maptilerClient.geocoding.forward(req.body.exploration.location, { limit: 1 });
    const exploration = new Exploration(req.body.exploration);
    exploration.geometry = geoData.features[0].geometry;
    //res.send(exploration.geometry.coordinates);
    exploration.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    exploration.author = req.user._id;
    await exploration.save();
    console.log(exploration);
    req.flash('success', 'Successfully created a new Exploration!');
    res.redirect(`/explorations/${exploration._id}`)
}

module.exports.showExploration = async (req, res,) => {
    const exploration = await Exploration.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!exploration) {
        req.flash('error', 'Cannot find that Exploration!');
        return res.redirect('/explorations');
    }
    res.render('explorations/show', { exploration });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const exploration = await Exploration.findById(id)
    if (!exploration) {
        req.flash('error', 'Cannot find that Exploration!');
        return res.redirect('/explorations');
    }
    res.render('explorations/edit', { exploration });
}

module.exports.updateExploration = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const exploration = await Exploration.findByIdAndUpdate(id, { ...req.body.exploration });
    const geoData = await maptilerClient.geocoding.forward(req.body.exploration.location, { limit: 1 });
    exploration.geometry = geoData.features[0].geometry;
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    exploration.images.push(...imgs);
    await exploration.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await exploration.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated Exploration!');
    res.redirect(`/explorations/${exploration._id}`)
}

module.exports.deleteExploration = async (req, res) => {
    const { id } = req.params;
    await Exploration.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted Exploration')
    res.redirect('/explorations');
}