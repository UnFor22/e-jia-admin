const mongoose = require('mongoose')
const swiper = new mongoose.Schema({
    title: String,
    sort: Number,
    status: Boolean,
    img: String,
    type: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'category'
    },

}, {versionKey: false, timestamps: {createdAt: 'create_time',updatedAt: 'update_time'}})
module.exports = mongoose.model('swiper', swiper )