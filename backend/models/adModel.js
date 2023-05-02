import mongoose from "mongoose";
import User from './userModel.js'
const now = new Date();
const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

const AdSchema = new mongoose.Schema({
  title:{
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },

  description:{
    type:String,
    maxlength: 500,
  },

  price:{
    type:Number,
    required: true,
    validate: {
      validator: function(value){
        return value >= 0;
      },
      message: "Price must not be lower than 0"
    }
  },

  date: {
    type: Date,
    default: date
  },

  postedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  username: {
    type: String,
    required: true,
  },

  images: {
    type:String
  }
});

export default mongoose.model('Ad', AdSchema);
