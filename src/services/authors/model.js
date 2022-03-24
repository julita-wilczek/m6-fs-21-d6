import mongoose from "mongoose"

const { Schema, model } = mongoose

const AuthorSchema = new Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, default: "https://picsum.photos/50"},
  },
  {
    timestamps: true,
  }
)

export default model("Author", AuthorSchema)