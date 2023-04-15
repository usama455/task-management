import { Schema, model } from "mongoose";

const CardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      minlength: [1, "Title must not be empty."],
    },
    project: {
      type: String,
      enum: ["General", "Design", "Development", "Marketing"], //Temp Array - Will be replaced with reference from Projects Collection
    },
    assignedTo: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    subTasks: [
      {
        description: {
          type: String,
          required: true,
        },
        checked: {
          type: Boolean,
          default: false,
        },
      },
    ],
    comments: [
      {
        description: {
          type: String,
          required: true,
        },
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    status: {
      type: String,
      enum: ["todo", "inProcess", "inReview", "completed"],
      default: "todo",
    },
  },
  { timestamps: true }
);

const Card = model("Card", CardSchema);

export default Card;
