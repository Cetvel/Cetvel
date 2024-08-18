// const mongoose = require('mongoose');

// const userPreferenceSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   notifications: {
//     reminders: { type: Boolean, default: true },
//     progress: { type: Boolean, default: true },
//     motivation: { type: Boolean, default: true },
//     newContent: { type: Boolean, default: true },
//     goals: { type: Boolean, default: true }
//   },
//   notificationFrequency: {
//     type: String,
//     enum: ['daily', 'weekly', 'off'],
//     default: 'daily'
//   },
//   timeWindow: {
//     start: { type: Number, min: 0, max: 23, default: 9 },
//     end: { type: Number, min: 0, max: 23, default: 21 }
//   },
//   silentModes: [{
//     type: String,
//     enum: ['classHours', 'nightTime']
//   }]
// });