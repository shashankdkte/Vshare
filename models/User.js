import mongoose from "mongoose";
// eslint-disable-next-line import/no-extraneous-dependencies
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number,
});
UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });
const model = mongoose.model("User", UserSchema);
export default model;
