const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Event title is required'],
        trim: true,
        maxlength: 150,
    },
    description: {
        type: String,
        trim: true,
        maxlength: 1000,
        default: '',
    },
    users: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        validate: {
            validator: (arr) => Array.isArray(arr) && arr.length>0,
            message: 'Atleast one profile must to assigned to the event',
        },
    },
    timezone: {
        type: String,
        required: [true, 'Timezone is required'],
        trim: true,
    },
    startAt: {
        type: Date,
        required: [true, 'Start date/time is required'],
    },
    endAt: {
        type: Date,
        required: [true, 'End date/time is required'],
        validate: {
            validator: (value) =>{
                const start = this.startAt || (this._update && this._update.startAt);
                return !start || value>=start;
            },
            message: 'End date/time cannot be before start date/time',
        }
    }
}, { timestamps: true });

eventSchema.index({ users: 1, startAt: 1 });

module.exports = mongoose.model('Event', eventSchema);