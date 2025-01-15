import mongoose from 'mongoose'
const { Schema } = mongoose;

const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,

    },
    image: {
        type: String,
        required: true
    },

    location: String
    ,
    category:String,
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'users'
    }
}, {
    timestamps: true
})


export default mongoose.model('Product', productSchema);
