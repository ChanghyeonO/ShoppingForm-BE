import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  id: string;
  email: string;
  password: string;
  name: string;
  shoppingmallNum: number;
  phoneNumber: string;
  refreshToken: string;
  isTempPassword: boolean;
}

const UserSchema = new Schema<IUser>({
  id: {
    type: String,
    required: true,
  },
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
  shoppingmallNum: {
    type: Number,
    required: true,
    default: 0,
  },
  refreshToken: {
    type: String,
    default: "",
  },
});

export default model<IUser>("User", UserSchema);
