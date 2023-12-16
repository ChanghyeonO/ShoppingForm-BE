import { Secret, SignOptions, sign } from "jsonwebtoken";
import { User, IUser } from "../models/index";
import dotenv from "dotenv";

dotenv.config();

export const setUserToken = async (
  user: IUser,
  isOnlyAccess: boolean,
): Promise<{ accessToken: string; refreshToken?: string }> => {
  const accessPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
  const accessOptions = { algorithm: "HS256", expiresIn: "1h" };
  const accessToken = sign(
    accessPayload,
    process.env.ACCESS_SECRET as Secret,
    accessOptions as SignOptions,
  );

  if (!isOnlyAccess) {
    const refreshPayload = {
      _id: user._id,
    };
    const refreshOptions = { algorithm: "HS256", expiresIn: "24h" };
    const refreshToken = sign(
      refreshPayload,
      process.env.REFRESH_SECRET as Secret,
      refreshOptions as SignOptions,
    );

    await User.updateOne(
      { _id: refreshPayload._id },
      {
        refreshToken: refreshToken,
      },
    );

    return { accessToken, refreshToken };
  } else {
    return { accessToken };
  }
};
