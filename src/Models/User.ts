import { Document, Schema, model, models } from "mongoose";

export interface User extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

const UserSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = models["users"] || model<User>("users", UserSchema);
