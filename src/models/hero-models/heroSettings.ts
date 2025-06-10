import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    layout: {
      type: String,
      required: true,
      enum: [
        "imageLeft",
        "imageRight",
        "textWithBgColor",
        "textWithCenterImage",
      ],
      default: "imageRight",
    },
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      default: "Contact",
    },
    profileImageUrl:{
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);
const HeroSettings = mongoose.models.Hero || mongoose.model("Hero", heroSchema);
export default HeroSettings;
