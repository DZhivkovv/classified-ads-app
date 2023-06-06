import mongoose from "mongoose";
import User from './userModel.js';
import moment from 'moment-timezone';
const defaultDate = moment().tz('Etc/GMT+3').toDate();
const AdSchema = new mongoose.Schema({
  title:{
    type: String,
    minlength: 2,
    maxlength: 100,
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

  category: {
    type: String,
    required: true,
    enum: ['Real Estate', 'Vehicles', 'Electronics', 'Home and Garden', 'Services', 'Jobs', 'Clothing and Shoes', 'Pets']
  },

  date: {
    type: Date,
    default: defaultDate,
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

  images: [{
    type:String
  }],

  isFreeShipping: {
    type: Boolean,
    default: false,
  },

  itemIsNew:{
    type: Boolean,
    default: false,
  }
});

export default mongoose.model('Ad', AdSchema);