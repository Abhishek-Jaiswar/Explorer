import mongoose from 'mongoose'
import bcrypt from 'bcrypt';

const userModel = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email should be unique!"]
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: Boolean
}, { timestamps: true })



userModel.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model("User", userModel)
export default User;