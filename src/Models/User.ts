import { generateRandomString } from "../Utility";
import { Document, Schema, model, models } from "mongoose";

export interface User extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  verifiedAt: Date;
  verified: boolean;
  verificationCode?: string;
  upload: {
    count: number;
    key: string;
  }
  invite: {
    count: number;
    invited: string[];
    invitedBy: string;
  }
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
  verifiedAt: {
    type: Date,
    default: null,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
    default: generateRandomString(32),
  },
  upload: {
    count: {
      type: Number,
      default: 0,
    },
    key: {
      type: String,
      default: generateRandomString(16),
    },
  },
  invite: {
    count: {
      type: Number,
      default: 0,
    },
    invited: {
      type: [String],
      default: [],
    },
    invitedBy: {
      type: String,
      required: true
    }
  }
});

export const User = models["users"] || model<User>("users", UserSchema);

