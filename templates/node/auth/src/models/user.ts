import mongoose, {
  model,
  Schema,
  type HydratedDocument,
  type Model,
} from "mongoose";
import bcrypt from "bcryptjs";
import { ROLES } from "@enums/index";
import type { IUser } from "types";

// Document type: includes fields + instance methods
export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

// replace _id type string -> ObjectId
type IUserDoc = Omit<IUser, "_id"> & {
  _id: mongoose.Types.ObjectId;
};

export type UserDocument = HydratedDocument<IUserDoc, IUserMethods>;

// Schema: only fields (IUser)
const userSchema = new Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // exclude by default
    },

    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.USER,
      required: true,
      immutable: true, // cannot be changed once set
    },

    isActive: {
      type: Boolean,
      default: false,
      required: true,
    },

    activationToken: {
      type: String,
    },

    activationTokenExpiresAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

// Pre-save hook: hash password
userSchema.pre<UserDocument>("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Instance method: compare password
userSchema.methods.comparePassword = async function (
  this: UserDocument,
  newPassword: string,
): Promise<boolean> {
  return bcrypt.compare(newPassword, this.password);
};

// Model type
export type UserModel = Model<UserDocument>;

// Export the model (check if already compiled)
export const User: UserModel =
  (mongoose.models.User as UserModel) ||
  model<UserDocument>("User", userSchema);
