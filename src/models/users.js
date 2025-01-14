import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required : true,
    },
    lastName:{
        type: String,
        required : true,
    },
    email:{
        type: String,
        required : true,
    },
    password:{
        type: String,
        required : true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});
    export default mongoose.models.User || mongoose.model('User', userSchema);