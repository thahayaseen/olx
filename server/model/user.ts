import mongoose from 'mongoose'

const schema =new mongoose.Schema({
    name:String,
    email:String,
    password:String
}
)

export default mongoose.model('users',schema)