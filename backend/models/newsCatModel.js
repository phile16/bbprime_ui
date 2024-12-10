import mongoose from 'mongoose';

const newsLocCatSchema = mongoose.Schema(
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

const newsLocCat = mongoose.model('NewsLocCat', newsLocCatSchema);
export default newsLocCat;
