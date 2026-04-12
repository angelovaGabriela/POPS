const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const sessionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }],
    userId: {
        type: ObjectId,
        ref: "User"
    },
    categoryId: {
        type: ObjectId,
        ref: "Category"
    },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Session', sessionSchema);
