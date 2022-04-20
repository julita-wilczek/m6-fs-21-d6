import mongoose from "mongoose"
import bcrypt from "bcrypt"

const { Schema, model } = mongoose

const AuthorSchema = new Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, default: "https://picsum.photos/50"},
    email: { type: String, required: true },
    password: { type: String, required: true }, 
    role: { type: String, enum: ["Author", "Admin"], default: "Author" }
  },
  {
    timestamps: true,
  }
)
// this hashes the password before it it is saved
AuthorSchema.pre("save", async function(next) {
  const author = this
  const plainPassword = author.password

  if (AuthorSchema.isModified("password")) {
    const hashedPassword = await bcrypt.hash(plainPassword, 10)
    author.password = hashedPassword
  }
  next()
})

export default model("Author", AuthorSchema)