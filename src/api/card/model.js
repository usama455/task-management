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
      required: [true, "Project is required."],
      enum: ["General", "Design", "Development", "Marketing"], //Will be replaced with reference from Projects Collection
    },
    status: {
      type: String,
      required: [true, "Status is required."],
      enum: ["todo", "inProcess", "inReview", "completed"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
  },
  { timestamps: true }
);

const Card = model("Card", CardSchema);

export default Card;
