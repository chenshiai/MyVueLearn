const mongoose = require('mongoose')
const { Schema } = mongoose
const md5 = require('md5')
const UserSchema = new Schema({
  role: {
    type: String,
    enum: ['superAdmin', 'admin', 'user'],
    default: 'user'
  },
  username: {
    type: String,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true // 自动去除空格
  },
  password: {
    type: String,
    set: md5
  },
  description: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  }
}, {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    },
    toJSON: {
      transform(doc, ret) {
        ret.id = red._id
        delete ret._id
        delete ret.password
      }
    },
    minimize: false
  })
mongoose.model('User', UserSchema)