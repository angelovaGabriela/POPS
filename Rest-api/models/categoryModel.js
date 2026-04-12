const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    subscribers: [{
        type: ObjectId,
        ref: "User"
    }],
    userId: {
        type: ObjectId,
        ref: "User"
    },
    sessions: [{
        type: ObjectId,
        ref: "Session"
    }],
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Category', categorySchema);
