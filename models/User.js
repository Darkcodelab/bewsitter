const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
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
    addedURLs: {
      type: String,
    },
  },
  { timestamps: true }
);

class UserClass {
  static findByEmail(email) {
    return this.findOne({ email });
  }
}

UserSchema.loadClass(UserClass);

module.exports = mongoose.model("User", UserSchema);
