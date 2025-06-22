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
    profileImageUrl: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: {
        hex: {
          type: String,
          default: "#ffffff", 
        },
        rgb: {
          r: { type: Number, default: 255 },
          g: { type: Number, default: 255 },
          b: { type: Number, default: 255 },
          a: { type: Number, default: 1 }, 
        },
      },
    },
  },
  { timestamps: true }
);
const HeroSettings = mongoose.models.Hero || mongoose.model("Hero", heroSchema);
export default HeroSettings;
