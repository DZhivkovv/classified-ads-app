import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is a required field"],
        trim: true,
        lowercase: true,
        unique: [true, "A user with such email already exists!"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Please enter a valid E-mail!");
            }
        },
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is a required field"],
        validate(value) {
            if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}/.test(value)) {
                throw Error(
                    'The password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&).'
                );
            }
        }
    },
    location: {
        type: String,
        default: "Not specified",
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('User', UserSchema);
