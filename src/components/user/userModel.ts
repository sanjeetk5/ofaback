import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { UserDocs, UserModel } from '../../types/user';

const userSchema = new mongoose.Schema<UserDocs>(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    age: {
      type: String,
    },
    name: {
      type: String,
      required: false,
      default: null,
    },

    createdOn: {
      type: Date,
      default: Date.now,
    },
    updatedOn: {
      type: Date,
      default: Date.now,
    },
  },

  {
    methods: {
      comparePassword: async function (candidatePassword: string) {
        const result: any = await bcrypt.compare(candidatePassword, this.password);
        return result;
      },
    },
    timestamps: true,
  },
);

userSchema.plugin(aggregatePaginate); /**Added for pagination */

const User = mongoose.model<UserDocs, UserModel>('Users', userSchema);

export default User;
