import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import postsRouter from "./services/posts/index.js"
import authorsRouter from "./services/authors/index.js"
import { badRequestHandler, unauthorizedHandler, forbiddenHandler, notFoundHandler, genericErrorHandler } from "./errorHandlers.js"

const server = express()
const port = process.env.PORT


server.use(cors())
server.use(express.json())

server.use("/blogPosts", postsRouter)
server.use("/authors", authorsRouter)

server.use(badRequestHandler)
server.use(unauthorizedHandler)
server.use(forbiddenHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to Mongo!")

  server.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
})