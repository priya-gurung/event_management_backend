const { timeStamp } = require('console');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        minlength: 1,
        maxlength: 80,
    },
    timezone: {
        type: String,
        default: 'UTC',
        trim: true,
    },
}, { timestamps: true });

userSchema.index({ name: 1 });

module.exports = mongoose.model('User', userSchema);