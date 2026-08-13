const mongoose = require('mongoose');

const changeSchema = new mongoose.Schema({
    field: {type: String, required: true},
    oldValue: {type: mongoose.Schema.Types.Mixed},
    newValue: {type: mongoose.Schema.Types.Mixed},
}, {_id: false});

const eventLogSchema = new mongoose.Schema({
    event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true},
    changes: {type: [changeSchema], default: []},
}, {timestamps: {createdAt: true, updatedAt: false }});

eventLogSchema.index({ event: 1, createdAt: -1});
module.exports = mongoose.model('Eventlog', eventLogSchema);