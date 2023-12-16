import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  shoppingMalls: Object;
  refreshToken: string;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    default: "",
  },
  shoppingMalls: [
    {
      type: Object,
    },
  ],
  refreshToken: {
    type: String,
    default: "",
  },
});

export default model<IUser>("User", UserSchema);
