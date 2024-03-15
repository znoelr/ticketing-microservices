import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface UserAttrs {
  email: string;
  password: string;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

interface UserModel  extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

export const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
}

export const User = mongoose.model<UserDoc, UserModel>('ModelName', userSchema);
