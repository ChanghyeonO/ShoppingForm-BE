import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  id: string;
  email: string;
  password: string;
  name: string;
  shoppingmalls: Object;
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
  shoppingmalls: [
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
