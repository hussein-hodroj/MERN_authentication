import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    //it means if a user is added, i want the create date and it is updated, i want the updated field
    timestamps: true
});

//hon aam n3mal l password hashed
//pre hiye zeta before
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

})

//check the hashed password to login 
//so hon iza l password match it will return true, but if it is not match it will return false
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); 
}

const User = mongoose.model('User', userSchema);

export default User;