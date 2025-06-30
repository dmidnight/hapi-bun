import { Model, model, Schema, Types } from "mongoose";

type ObjectId = Types.ObjectId;

export interface IUser {
  _id: ObjectId | string;
  active: Date;
  created: Date;
  email: string;
  firstName: string;
  lastName: string;
  hash: string;
  requiresPasswordReset?: boolean;
  role: "admin" | "user";
}

interface IUserMethods {
  getSafeData(): Omit<IUser, "hash" | "salt">;
}

type UserModel = Model<IUser, object, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  active: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  hash: { type: String, required: true },
  requiresPasswordReset: { type: Boolean, default: true },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

UserSchema.method("getSafeData", function getSafeData() {
  return {
    _id: this._id.toString(),
    active: this.active,
    created: this.created,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    role: this.role,
    requiresPasswordReset: this.requiresPasswordReset,
  };
});

export const User = model<IUser, UserModel>("User", UserSchema);
