const { userModel, categoryModel, sessionModel } = require('../models');

function newSession(text, userId, categoryId) {
    return sessionModel.create({ text, userId, categoryId })
        .then(session => {
            return Promise.all([
                userModel.updateOne({ _id: userId }, { $push: { sessions: session._id }, $addToSet: { categories: categoryId } }),
                categoryModel.findByIdAndUpdate({ _id: categoryId }, { $push: { sessions: session._id }, $addToSet: { subscribers: userId } }, { new: true })
            ])
        })
}

function getLatestsSessions(req, res, next) {
    const limit = Number(req.query.limit) || 0;

    sessionModel.find()
        .sort({ created_at: -1 })
        .limit(limit)
        .populate('categoryId userId')
        .then(sessions => {
            res.status(200).json(sessions)
        })
        .catch(next);
}

function createSession(req, res, next) {
    const { categoryId } = req.params;
    const { _id: userId } = req.user;
    const { sessionText } = req.body;

    newSession(sessionText, userId, categoryId)
        .then(([_, updatedCategory]) => res.status(200).json(updatedCategory))
        .catch(next);
}

function editSession(req, res, next) {
    const { sessionId } = req.params;
    const { sessionText } = req.body;
    const { _id: userId } = req.user;

    // if the userId is not the same as this one of the session, the session will not be updated
    sessionModel.findOneAndUpdate({ _id: sessionId, userId }, { text: sessionText }, { new: true })
        .then(updatedSession => {
            if (updatedSession) {
                res.status(200).json(updatedSession);
            }
            else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function deleteSession(req, res, next) {
    const { sessionId, categoryId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        sessionModel.findOneAndDelete({ _id: sessionId, userId }),
        userModel.findOneAndUpdate({ _id: userId }, { $pull: { sessions: sessionId } }),
        categoryModel.findOneAndUpdate({ _id: categoryId }, { $pull: { sessions: sessionId } }),
    ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function like(req, res, next) {
    const { sessionId } = req.params;
    const { _id: userId } = req.user;

    console.log('like')

    sessionModel.updateOne({ _id: sessionId }, { $addToSet: { likes: userId } }, { new: true })
        .then(() => res.status(200).json({ message: 'Liked successful!' }))
        .catch(next)
}

module.exports = {
    getLatestsSessions,
    newSession,
    createSession,
    editSession,
    deleteSession,
    like,
}
