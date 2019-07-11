const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String
      // required: true
    },
    lastname: {
      type: String
      // required: true
    },
    username: {
      type: String
      // required: true,
      // unique: true
    },
    password: {
      type: String
      // lowercase: true,
      // required: [true, "can't be blank"]
      // match: [/\S+@\S+\.\S+/, 'is invalid'],
      // index: true
    },
    age: {
      type: Number,
      // required: true,
      min: 18,
      max: 99
    },
    languages: {
      type: [String]
    },
    keyInt: {
      type: String
    },
    userType: {
      type: String,
      enum: ["Admin", "User"],
      default: "User"
    },
    bio: {
      type: String,
      minlength: 1,
      maxlength: 500
    },
    imageUrl: String,
    city: String
    // facebookId: String
    // country of origin: String,
    // feelingValue: {
    //   type: String,
    //   enum: ['happy', 'exited', 'bored', 'angry', 'shocked']
    // },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
