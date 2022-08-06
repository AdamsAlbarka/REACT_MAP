const mongoose = require('mongoose')

const PinSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required: true,
        },

        title:{
            type: String,
            required: true,
            min:3,
        },

        desc:{
            type: String,
            required: true,
            max: 6,
        },

        
        rating:{
            type: Number,
            required: true,
            max: 5,
            min:0
        },

        
        lat:{
            type: String,
            required: true,
        },

        long:{
            type: String,
            required: true,
        },
    },
    {timestamps: true}
)

module.exports = mongoose.model("Pin", PinSchema )