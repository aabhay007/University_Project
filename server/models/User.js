import mongoose, { Schema } from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilepic: { type: String },
    role: { type: String, default: "user" },
    image: { type: String },
    streetaddress: { type: String },
    city: { type: String },
    state: { type: String },
    phoneno:{ type: String}
  },
  { timestamps: true }
);
const UserModel = mongoose.model("user", UserSchema);
export default UserModel;
