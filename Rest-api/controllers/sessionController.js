const { sessionModel } = require('../models');

// ======================
// GET ALL SESSIONS
// ======================
function getSessions(req, res, next) {
  sessionModel
    .find()
    .sort({ createdAt: -1 })
    .then((sessions) => res.status(200).json(sessions))
    .catch(next);
}

// ======================
// GET BY ID
// ======================
function getSessionById(req, res, next) {
  const { id } = req.params;

  sessionModel
    .findById(id)
    .then((session) => {
      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }
      res.status(200).json(session);
    })
    .catch(next);
}

// ======================
// CREATE SESSION
// ======================
function createSession(req, res, next) {

  const { _id: userId } = req.user;

  const data = {
    ...req.body,
    userId,
  };
  sessionModel
    .create(data)
    .then((session) => {
      console.log("SAVED SESSION:", session);
      res.status(201).json(session);
    })
    .catch((err) => {
    
      next(err);
    });
}

// ======================
// UPDATE SESSION
// ======================
function updateSession(req, res, next) {
  const { sessionId } = req.params;
  const { _id: userId } = req.user;

  sessionModel
    .findOneAndUpdate(
      { _id: sessionId, userId }, // ownership check
      req.body,
      { new: true }
    )
    .then((updated) => {
      if (!updated) {
        return res.status(403).json({ message: 'Not allowed' });
      }
      res.status(200).json(updated);
    })
    .catch(next);
}

// ======================
// DELETE SESSION
// ======================
function deleteSession(req, res, next) {
  const { sessionId } = req.params;
  const { _id: userId } = req.user;

  sessionModel
    .findOneAndDelete({ _id: sessionId, userId })
    .then((deleted) => {
      if (!deleted) {
        return res.status(403).json({ message: 'Not allowed' });
      }
      res.status(200).json(deleted);
    })
    .catch(next);
}

module.exports = {
  getSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
};