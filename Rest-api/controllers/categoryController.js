const { categoryModel } = require('../models');
const { newSession } = require('./sessionController')

function getCategories(req, res, next) {
    categoryModel.find()
        .populate('userId')
        .then(categories => res.json(categories))
        .catch(next);
}

function getCategory(req, res, next) {
    const { categoryId } = req.params;

    categoryModel.findById(categoryId)
        .populate({
            path : 'sessions',
            populate : {
              path : 'userId'
            }
          })
        .then(category => res.json(category))
        .catch(next);
}

function createCategory(req, res, next) {
    const { categoryName, sessionText } = req.body;
    const { _id: userId } = req.user;

    categoryModel.create({ categoryName, userId, subscribers: [userId] })
        .then(category => {
            newSession(sessionText, userId, category._id)
                .then(([_, updatedCategory]) => res.status(200).json(updatedCategory))
        })
        .catch(next);
}

function subscribe(req, res, next) {
    const categoryId = req.params.categoryId;
    const { _id: userId } = req.user;
    categoryModel.findByIdAndUpdate({ _id: categoryId }, { $addToSet: { subscribers: userId } }, { new: true })
        .then(updatedCategory => {
            res.status(200).json(updatedCategory)
        })
        .catch(next);
}

module.exports = {
    getCategories,
    createCategory,
    getCategory,
    subscribe,
}
