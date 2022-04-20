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
  
  if (author.isModified("password")) {
    const hashedPassword = await bcrypt.hash(plainPassword, 10)
    author.password = hashedPassword
  }
  next()
})

// this checks if the password matches the hash stored in db
AuthorSchema.statics.checkCredentials = async function(email, plainPassword) {
  const author = await this.findOne({email})
  if (author) {
    const isMatch = await bcrypt.compare(plainPassword, author.password)

    if (isMatch) {
      return author
    } else {
      return null
    }
  } else {
    return null
  }
}

// this ensures that stored hash is never sent
AuthorSchema.methods.toJSON = function () {
  // EVERY TIME Express does a res.send of users documents, this toJSON function is called
  const authorDocument = this
  const authorObject = authorDocument.toObject()

  delete authorObject.password
  return authorObject
}

export default model("Author", AuthorSchema)