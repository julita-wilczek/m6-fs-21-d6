import mongoose from "mongoose"

const { Schema, model } = mongoose

const postSchema = new Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    cover: { type: String, default: "https://picsum.photos/200/300" },
    content: { type: String, required: true },
    readTime: {value: {type: Number}, unit: {type: String}},
    comments: [
      {name: {type: String, required: true}, text: {type: String, required: true}, date: {type: Date, required: true}}
    ], 
    authors: [{ type: Schema.Types.ObjectId, ref: "Author" }]
  },
  {
    timestamps: true,
  }
)


export default model("Post", postSchema) 