import mongoose from 'mongoose';

const newsLocSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const newsLoc = mongoose.model('NewsLoc', newsLocSchema);
export default NewsLoc;
