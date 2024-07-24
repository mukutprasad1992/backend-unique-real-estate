import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
  first_Name: string;
  last_Name: string;
  email: string;
  password: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  state ?: string;
  state_abbreviation ?: string;
}

const userSchema: Schema<IUser> = new Schema({
  first_Name: {
    type: String,
    required: true,
    trim: true
  },
  last_Name: {
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
 
});

const Users: Model<IUser> = mongoose.model<IUser>("createUser", userSchema);

export default Users;
