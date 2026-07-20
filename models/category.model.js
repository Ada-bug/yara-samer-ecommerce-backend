const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true , "your category needs a name"],
        trim: true
    },
    description: {
        type: String
    },
    slug: {
        type: String
    }
},{ timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);


module.exports = Category