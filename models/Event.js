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
      type: String
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
    date: String,
    message: [
      {
        message: String,
        user: {
          type: Schema.Types.ObjectId,
          ref: "User"
        }
      }
    ],

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
