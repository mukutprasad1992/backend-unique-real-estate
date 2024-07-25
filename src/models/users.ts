import mongoose, { Schema, Document ,Model } from 'mongoose';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

const userSchema: Schema<IUser> = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        return /^\S+@gmail\.com$/.test(v); // Simple email validation regex
      },
      message: (props: any) => `${props.value} is not a valid email address!`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
})
// Add a method fohanging password
userSchema.methods.changePassword = function(newPassword: string) {
  this.password = newPassword;
  return this.save();
};

const Users: Model<IUser> = mongoose.model<IUser>("createUser", userSchema);

export default Users;
