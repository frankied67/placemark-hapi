import Mongoose from "mongoose";

const { Schema } = Mongoose;

const monumentSchema = new Schema({
  title: String,
  latitude: Number,
  longitude: Number,
  category: String,
  locationid: {
    type: Schema.Types.ObjectId,
    ref: "Location",
  },
});

export const Monument = Mongoose.model("Monument", monumentSchema);
