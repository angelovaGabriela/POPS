const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    detailedDescription: {
      type: String,
    },
    type: {
      type: String,
      enum: ['yoga', 'pilates'],
      required: true,
    },
    goal: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },

    durationMinutes: {
      type: Number,
      required: true,
      min: 1,
    },

    exercises: [
      {
        name: { type: String, required: true },
        duration: { type: Number }, // optional
      },
    ],

    musicUrl: {
      type: String,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Session', sessionSchema);