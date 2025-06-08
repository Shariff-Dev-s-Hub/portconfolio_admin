import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    layout: {
      type: String,
      required: true,
      enum: ["imageLeft", "imageRight", "textWithBgColor", "textWithBgImage"],
      default: "imageRight",
    },
  },
  { timestamps: true }
);
const HeroSettings = mongoose.models.Hero || mongoose.model("Hero", heroSchema);
export default HeroSettings;
