import { string } from "joi";
import { Document, Schema, model, models } from "mongoose";

export interface Invite extends Document {
  _id: string;
  createdAt: Date;
  createdBy: string;
}

const InviteSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: true,
  },
});

export const Invite = models["invites"] || model<Invite>("invites", InviteSchema);
