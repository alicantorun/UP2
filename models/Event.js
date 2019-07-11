const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    keyCat: {
      type: String,
      enum: ["sports", "culture", "casual", "nightlife", "nature", "family"] 
      
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imageUrl: String,
    date: Date,
      
    // startTime: {
    //   type: Date,
    //   required: true
    // },
    // endTime: {
    //   type: Date,
    //   required: true
    // },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
      // imageUrl:
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
