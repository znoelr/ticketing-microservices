import mongoose from "mongoose";
import { HashService } from "../../services/hash.service";

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

userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashed = await HashService.toHash(this.password);
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
}

export const User = mongoose.model<UserDoc, UserModel>('ModelName', userSchema);
