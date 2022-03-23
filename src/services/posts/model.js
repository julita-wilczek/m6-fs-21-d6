import mongoose from "mongoose"

const { Schema, model } = mongoose

const postSchema = new Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    cover: { type: String, default: "https://picsum.photos/200/300" },
    content: { type: String, required: true },
    readTime: {value: {type: Number}, unit: {type: String}},
    author: {name: {type: String, required: true}, avatar: {type: String, default: "https://picsum.photos/50"}}, 
    comments: [
      {name: {type: String, required: true}, text: {type: String, required: true}, date: {type: Date, required: true}}
    ]
  },
  {
    timestamps: true,
  }
)

export default model("Post", postSchema) 