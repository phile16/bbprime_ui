import mongoose from 'mongoose';

const newsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    summary: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
      default: false,
    },
    location: {
      type: String,
      required: false,
      default: false,
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);


const News = mongoose.model('News', newsSchema);

export default News;
