import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true }
);


ideaSchema.pre("save", function (next) {
  if (!this.slug) {
    const tempSlug = this.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    this.slug = `${tempSlug}-${this._id ? this._id : Date.now()}`;
  }
  next();
});

export default mongoose.model("Idea", ideaSchema);
